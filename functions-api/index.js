const { onRequest } = require('firebase-functions/v2/https');
const { createApp } = require('./src/app');

const app = createApp();

exports.api = onRequest(
  {
    region: 'us-central1',
    memory: '512MiB',
    maxInstances: 10,
    secrets: ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'GOOGLE_SERVICE_ACCOUNT_JSON'],
  },
  app,
);