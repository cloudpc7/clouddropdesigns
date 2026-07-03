/**
 * Local Express server (not Cloud Functions). Proxied by Vite during `npm run dev`.
 * Reads production RTDB with Application Default Credentials or public rules.
 */
const { createApp } = require('./app');

const PORT = Number(process.env.PORT ?? 3001);

const app = createApp();
app.listen(PORT, () => {
  console.log(`Content API listening on http://localhost:${PORT}`);
  console.log(`  GET http://localhost:${PORT}/api/health`);
  console.log(`  GET http://localhost:${PORT}/api/content`);
  console.log(`  GET http://localhost:${PORT}/api/content/codeDrops`);
});