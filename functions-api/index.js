const { onRequest } = require('firebase-functions/v2/https');
const { createApp } = require('./src/app');

const app = createApp();

exports.api = onRequest(
  {
    region: 'us-central1',
    memory: '512MiB',
    maxInstances: 10,
  },
  app,
);