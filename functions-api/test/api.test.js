const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const request = require('supertest');
const { createApp } = require('../src/app');
const { createMemoryStore } = require('../src/store');

const validInquiry = {
  name: 'Alex Rivera',
  email: 'alex@example.com',
  phone: '555-0100',
  projectType: 'web',
  description: 'Need a marketing site for a California studio.',
  timeline: 'flexible',
};

describe('CloudDrop content API', () => {
  let store;
  let app;

  beforeEach(() => {
    delete process.env.TURNSTILE_SECRET_KEY;
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    store = createMemoryStore();
    app = createApp({ store });
  });

  it('GET /api/content returns 200 JSON with siteConfig', async () => {
    const response = await request(app).get('/api/content').expect(200);

    assert.equal(response.headers['content-type'].includes('application/json'), true);
    assert.equal(typeof response.body, 'object');
    assert.ok(response.body.siteConfig);
    assert.equal(response.body.siteConfig.siteName, 'CloudDropDesigns');
    assert.equal(response.body.siteConfig.contact.email, 'cloud@clouddropdesigns.com');
    assert.ok(response.body.studioNav);
    assert.ok(response.body.codeDrops);
    assert.ok(response.body.vibenmedLegal?.privacyPolicyHtml);
  });

  it('POST /api/inquiry without secrets returns 202 and writes DynamoDB-shaped rows', async () => {
    const response = await request(app).post('/api/inquiry').send(validInquiry).expect(202);

    assert.equal(response.body.ok, true);
    assert.equal(response.body.sent, false);
    assert.equal(response.body.dryRun, true);
    assert.match(response.body.message, /received/i);

    const customers = await store.listCustomers();
    const inquiries = await store.listInquiries();

    assert.equal(customers.length, 1);
    assert.equal(customers[0].email, 'alex@example.com');
    assert.equal(customers[0].name, 'Alex Rivera');
    assert.equal(customers[0].phone, '555-0100');
    assert.equal(customers[0].status, 'active');
    assert.equal(customers[0].source, 'inquiry');

    assert.equal(inquiries.length, 1);
    assert.equal(inquiries[0].customerId, customers[0].id);
    assert.equal(inquiries[0].projectType, 'web');
    assert.equal(inquiries[0].emailSent, false);
    assert.equal(inquiries[0].calendarEventCreated, false);
  });

  it('POST /api/inquiry upserts the same customer by email', async () => {
    await request(app).post('/api/inquiry').send(validInquiry).expect(202);
    await request(app)
      .post('/api/inquiry')
      .send({
        ...validInquiry,
        name: 'Alex R.',
        phone: '555-0199',
        description: 'Follow-up on the same project.',
      })
      .expect(202);

    const customers = await store.listCustomers();
    const inquiries = await store.listInquiries();

    assert.equal(customers.length, 1);
    assert.equal(customers[0].name, 'Alex R.');
    assert.equal(customers[0].phone, '555-0199');
    assert.equal(inquiries.length, 2);
    assert.equal(inquiries[0].customerId, customers[0].id);
    assert.equal(inquiries[1].customerId, customers[0].id);
  });
});

describe('ContentGate chrome', () => {
  it('always returns children and has no live-content error banner', () => {
    const source = fs.readFileSync(
      path.join(__dirname, '../../src/components/ContentGate.jsx'),
      'utf8',
    );

    assert.match(source, /dispatch\(fetchAllContent\(\)\)/);
    assert.match(source, /return children/);
    assert.doesNotMatch(source, /content-gate--error/);
    assert.doesNotMatch(source, /Live content is unavailable/);
    assert.doesNotMatch(source, /Retry live content/);
    assert.doesNotMatch(source, /Unable to load site content/);
  });
});

