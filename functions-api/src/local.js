/**
 * Local Express server (not Lambda). Proxied by Vite during `npm run dev`.
 * Uses an in-memory store + seeded site content unless DynamoDB table env vars are set.
 */
const { createApp } = require('./app');

const PORT = Number(process.env.PORT ?? 3001);

const app = createApp();
app.listen(PORT, () => {
  console.log(`Content API listening on http://localhost:${PORT}`);
  console.log(`  GET http://localhost:${PORT}/api/health`);
  console.log(`  GET http://localhost:${PORT}/api/content`);
  console.log(`  GET http://localhost:${PORT}/api/content/codeDrops`);
  console.log(`  POST http://localhost:${PORT}/api/inquiry`);
  console.log(`  GET  http://localhost:${PORT}/api/inquiry/availability?date=YYYY-MM-DD`);
});
