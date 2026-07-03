const { onRequest } = require('firebase-functions/v2/https');
const { createApp } = require('./src/app');

const app = createApp();

exports.api = onRequest(
  {
    region: 'us-central1',
    maxInstances: 10,
  },
  app,
);