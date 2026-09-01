const DEFAULT_ORIGINS = [
  'https://clouddropdesigns.com',
  'http://localhost:5173',
];

const parseOrigins = (value) =>
  String(value || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const getAllowedOrigins = () => [...new Set([...DEFAULT_ORIGINS, ...parseOrigins(process.env.CORS_ORIGINS)])];

const createCorsOptions = () => {
  const allowed = getAllowedOrigins();

  return {
    origin: (origin, callback) => {
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    maxAge: 86400,
  };
};

module.exports = {
  DEFAULT_ORIGINS,
  getAllowedOrigins,
  createCorsOptions,
};
