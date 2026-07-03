const express = require('express');
const cors = require('cors');
const { DATABASE_URL, readRtdb } = require('./rtdb');
const { CONTENT_SECTIONS, resolveSectionKey } = require('./contentSections');

const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: true,
    }),
  );

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'clouddrop-content-api',
      databaseURL: DATABASE_URL,
    });
  });

  app.get('/api/content', async (_req, res, next) => {
    try {
      const data = await readRtdb('content');
      if (data == null) {
        res.status(404).json({ error: 'Content not found in Realtime Database' });
        return;
      }
      res.set('Cache-Control', 'public, max-age=60');
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/content/:section', async (req, res, next) => {
    try {
      const section = resolveSectionKey(req.params.section);
      if (!section) {
        res.status(400).json({
          error: 'Unknown content section',
          section: req.params.section,
          available: CONTENT_SECTIONS.filter((key) => key !== 'meta'),
        });
        return;
      }

      const data = await readRtdb(`content/${section}`);
      if (data == null) {
        res.status(404).json({ error: 'Section not found', section });
        return;
      }

      res.set('Cache-Control', 'public, max-age=60');
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.use((error, _req, res, _next) => {
    console.error('Content API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  });

  return app;
};

module.exports = { createApp };