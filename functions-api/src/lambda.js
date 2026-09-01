const serverlessExpress = require('@codegenie/serverless-express');
const { createApp } = require('./app');
const { loadSecrets } = require('./secrets');

let cachedHandler;

const bootstrap = async () => {
  if (cachedHandler) {
    return cachedHandler;
  }

  await loadSecrets();
  cachedHandler = serverlessExpress({ app: createApp() });
  return cachedHandler;
};

exports.handler = async (event, context) => {
  const handler = await bootstrap();
  return handler(event, context);
};
