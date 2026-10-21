const express = require('express');
const cors = require('cors');
const { CONTENT_SECTIONS, resolveSectionKey } = require('./contentSections');
const { createCorsOptions } = require('./cors');
const { registerInquiryRoute } = require('./inquiryRoute');
const { createStore, ensureSiteContent, hasDynamoTables } = require('./store');

const createApp = (options = {}) => {
  const app = express();
  const store = options.store ?? createStore(options);

  app.use(cors(createCorsOptions()));
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'clouddrop-content-api',
      store: store.kind,
      dynamoConfigured: hasDynamoTables(),
    });
  });

  app.get('/api/content', async (_req, res, next) => {
    try {
      const data = await ensureSiteContent(store);
      res.set('Cache-Control', 'public, max-age=60');
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  registerInquiryRoute(app, { store });

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

      const data = await ensureSiteContent(store);
      const sectionData = data?.[section];
      if (sectionData == null) {
        res.status(404).json({ error: 'Section not found', section });
        return;
      }

      res.set('Cache-Control', 'public, max-age=60');
      res.json(sectionData);
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
