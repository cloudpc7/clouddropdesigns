const { randomUUID } = require('crypto');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} = require('@aws-sdk/lib-dynamodb');
const { SITE_CONTENT_PK, buildSeedSiteContent } = require('./seedContent');

const nowIso = () => new Date().toISOString();

const clone = (value) => JSON.parse(JSON.stringify(value));

const createMemoryStore = (seed = buildSeedSiteContent()) => {
  const siteContent = new Map();
  const customersById = new Map();
  const customersByEmail = new Map();
  const inquiriesById = new Map();

  siteContent.set(SITE_CONTENT_PK, {
    pk: SITE_CONTENT_PK,
    payload: clone(seed),
    updatedAt: seed.meta?.updatedAt ?? nowIso(),
  });

  return {
    kind: 'memory',
    async getSiteContent(pk = SITE_CONTENT_PK) {
      const item = siteContent.get(pk);
      return item ? clone(item) : null;
    },
    async putSiteContent(pk, payload, updatedAt = nowIso()) {
      const item = { pk, payload: clone(payload), updatedAt };
      siteContent.set(pk, item);
      return clone(item);
    },
    async getCustomerByEmail(email) {
      const id = customersByEmail.get(email.toLowerCase());
      return id ? clone(customersById.get(id)) : null;
    },
    async upsertCustomer({ email, name, phone, source = 'inquiry', status = 'active' }) {
      const normalizedEmail = email.toLowerCase();
      const existing = await this.getCustomerByEmail(normalizedEmail);
      const timestamp = nowIso();

      if (existing) {
        const updated = {
          ...existing,
          name: name || existing.name,
          phone: phone || existing.phone,
          status: existing.status || status,
          updatedAt: timestamp,
        };
        customersById.set(existing.id, updated);
        return clone(updated);
      }

      const created = {
        id: randomUUID(),
        email: normalizedEmail,
        name,
        phone: phone || '',
        createdAt: timestamp,
        updatedAt: timestamp,
        status,
        source,
      };
      customersById.set(created.id, created);
      customersByEmail.set(normalizedEmail, created.id);
      return clone(created);
    },
    async createInquiry(record) {
      const created = {
        ...record,
        id: record.id || randomUUID(),
        createdAt: record.createdAt || nowIso(),
      };
      inquiriesById.set(created.id, clone(created));
      return clone(created);
    },
    async updateInquiry(id, fields) {
      const existing = inquiriesById.get(id);
      if (!existing) {
        return null;
      }
      const updated = { ...existing, ...fields, updatedAt: nowIso() };
      inquiriesById.set(id, updated);
      return clone(updated);
    },
    async getInquiry(id) {
      const item = inquiriesById.get(id);
      return item ? clone(item) : null;
    },
    async listInquiries() {
      return [...inquiriesById.values()].map(clone);
    },
    async listCustomers() {
      return [...customersById.values()].map(clone);
    },
  };
};

const requireEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for the DynamoDB store`);
  }
  return value;
};

const createDynamoStore = ({ client } = {}) => {
  const dynamo =
    client ??
    DynamoDBDocumentClient.from(
      new DynamoDBClient({ region: process.env.AWS_REGION || 'us-west-2' }),
      {
        marshallOptions: { removeUndefinedValues: true },
      },
    );

  const siteTable = requireEnv('SITE_CONTENT_TABLE');
  const customersTable = requireEnv('CUSTOMERS_TABLE');
  const inquiriesTable = requireEnv('INQUIRIES_TABLE');

  return {
    kind: 'dynamodb',
    async getSiteContent(pk = SITE_CONTENT_PK) {
      const result = await dynamo.send(
        new GetCommand({
          TableName: siteTable,
          Key: { pk },
        }),
      );
      return result.Item ?? null;
    },
    async putSiteContent(pk, payload, updatedAt = nowIso()) {
      const item = { pk, payload, updatedAt };
      await dynamo.send(
        new PutCommand({
          TableName: siteTable,
          Item: item,
        }),
      );
      return item;
    },
    async getCustomerByEmail(email) {
      const result = await dynamo.send(
        new QueryCommand({
          TableName: customersTable,
          IndexName: 'EmailIndex',
          KeyConditionExpression: 'email = :email',
          ExpressionAttributeValues: { ':email': email.toLowerCase() },
          Limit: 1,
        }),
      );
      return result.Items?.[0] ?? null;
    },
    async upsertCustomer({ email, name, phone, source = 'inquiry', status = 'active' }) {
      const normalizedEmail = email.toLowerCase();
      const existing = await this.getCustomerByEmail(normalizedEmail);
      const timestamp = nowIso();

      if (existing) {
        const result = await dynamo.send(
          new UpdateCommand({
            TableName: customersTable,
            Key: { id: existing.id },
            UpdateExpression: 'SET #name = :name, phone = :phone, updatedAt = :updatedAt',
            ExpressionAttributeNames: { '#name': 'name' },
            ExpressionAttributeValues: {
              ':name': name || existing.name,
              ':phone': phone || existing.phone || '',
              ':updatedAt': timestamp,
            },
            ReturnValues: 'ALL_NEW',
          }),
        );
        return result.Attributes;
      }

      const created = {
        id: randomUUID(),
        email: normalizedEmail,
        name,
        phone: phone || '',
        createdAt: timestamp,
        updatedAt: timestamp,
        status,
        source,
      };
      await dynamo.send(
        new PutCommand({
          TableName: customersTable,
          Item: created,
        }),
      );
      return created;
    },
    async createInquiry(record) {
      const created = {
        ...record,
        id: record.id || randomUUID(),
        createdAt: record.createdAt || nowIso(),
      };
      await dynamo.send(
        new PutCommand({
          TableName: inquiriesTable,
          Item: created,
        }),
      );
      return created;
    },
    async updateInquiry(id, fields) {
      const names = {};
      const values = {};
      const sets = ['updatedAt = :updatedAt'];
      values[':updatedAt'] = nowIso();

      for (const [key, value] of Object.entries(fields)) {
        names[`#${key}`] = key;
        values[`:${key}`] = value;
        sets.push(`#${key} = :${key}`);
      }

      const result = await dynamo.send(
        new UpdateCommand({
          TableName: inquiriesTable,
          Key: { id },
          UpdateExpression: `SET ${sets.join(', ')}`,
          ExpressionAttributeNames: Object.keys(names).length ? names : undefined,
          ExpressionAttributeValues: values,
          ReturnValues: 'ALL_NEW',
        }),
      );
      return result.Attributes ?? null;
    },
    async getInquiry(id) {
      const result = await dynamo.send(
        new GetCommand({
          TableName: inquiriesTable,
          Key: { id },
        }),
      );
      return result.Item ?? null;
    },
  };
};

const hasDynamoTables = () =>
  Boolean(
    process.env.SITE_CONTENT_TABLE && process.env.CUSTOMERS_TABLE && process.env.INQUIRIES_TABLE,
  );

const createStore = (options = {}) => {
  if (options.store) {
    return options.store;
  }
  if (options.memory || !hasDynamoTables()) {
    return createMemoryStore(options.seed);
  }
  return createDynamoStore(options);
};

const ensureSiteContent = async (store) => {
  const existing = await store.getSiteContent(SITE_CONTENT_PK);
  if (existing?.payload) {
    return existing.payload;
  }

  const seed = buildSeedSiteContent();
  const updatedAt = nowIso();
  seed.meta = {
    ...(seed.meta ?? {}),
    source: store.kind === 'dynamodb' ? 'seed' : seed.meta?.source ?? 'seed',
    updatedAt,
  };
  await store.putSiteContent(SITE_CONTENT_PK, seed, updatedAt);
  return seed;
};

module.exports = {
  createMemoryStore,
  createDynamoStore,
  createStore,
  ensureSiteContent,
  hasDynamoTables,
};
