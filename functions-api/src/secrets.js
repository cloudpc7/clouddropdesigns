const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const SECRET_KEYS = [
  'TURNSTILE_SECRET_KEY',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'INQUIRY_TO_EMAIL',
  'INQUIRY_EMAIL_MAILBOX',
  'INQUIRY_EMAIL_DOMAIN',
  'GOOGLE_SERVICE_ACCOUNT_JSON',
  'GOOGLE_CALENDAR_IMPERSONATE_EMAIL',
  'GOOGLE_INQUIRIES_CALENDAR_ID',
  'GOOGLE_INQUIRIES_CALENDAR_NAME',
];

const applySecrets = (secrets) => {
  if (!secrets || typeof secrets !== 'object') {
    return;
  }

  for (const key of SECRET_KEYS) {
    const value = secrets[key];
    if (value && !process.env[key]) {
      process.env[key] = String(value);
    }
  }
};

const loadSecrets = async () => {
  const arn = process.env.APP_SECRETS_ARN;
  if (!arn) {
    return { loaded: false, reason: 'APP_SECRETS_ARN is not set' };
  }

  try {
    const client = new SecretsManagerClient({
      region: process.env.AWS_REGION || 'us-west-2',
    });
    const result = await client.send(new GetSecretValueCommand({ SecretId: arn }));
    const raw = result.SecretString || '{}';
    applySecrets(JSON.parse(raw));
    return { loaded: true };
  } catch (error) {
    console.error('[Secrets] Failed to load APP_SECRETS_ARN', error.message);
    return { loaded: false, reason: error.message };
  }
};

module.exports = {
  SECRET_KEYS,
  applySecrets,
  loadSecrets,
};
