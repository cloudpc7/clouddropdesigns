const express = require('express');
const cors = require('cors');
const { CONTENT_SECTIONS, resolveSectionKey } = require('./contentSections');
const { createCorsOptions } = require('./cors');
const { registerInquiryRoute } = require('./inquiryRoute');
const { createStore, ensureSiteContent, hasDynamoTables } = require('./store');

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const ssrDir = path.join(__dirname, '..', 'ssr');
const pagesDir = path.join(ssrDir, 'pages');
const templates = new Map();
let render;

const readTemplate = (pagePath) => {
  if (!templates.has(pagePath)) {
    const file = path.join(pagesDir, pagePath, 'index.html');
    templates.set(pagePath, fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null);
  }
  return templates.get(pagePath);
};

const getDeviceType = (req) => {
  if (req.get('cloudfront-is-mobile-viewer') === 'true') return 'mobile';
  if (req.get('cloudfront-is-tablet-viewer') === 'true') return 'tablet';
  if (req.get('cloudfront-is-desktop-viewer') === 'true') return 'desktop';
  if (req.get('sec-ch-ua-mobile') === '?1') return 'mobile';
  const ua = req.get('user-agent') || '';
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) return 'tablet';
  if (/Mobi|iPhone|iPod|Android/i.test(ua)) return 'mobile';
  return 'desktop';
};

const renderPage = async (url, content, deviceType) => {
  const pagePath = url.split('?')[0].replace(/\/+$/, '') || '/';
  const known = /^[a-z0-9/-]+$/i.test(pagePath) ? readTemplate(pagePath) : null;
  const template = known ?? readTemplate('/');
  render ??= (await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)).render;
  const { html, state } = await render(url, content, deviceType);
  const json = JSON.stringify(state).replace(/</g, '\\u003c');
  const preloads = [];
  const body = html.replace(/<link rel="preload"[^>]*\/>/g, (tag) => {
    preloads.push(tag);
    return '';
  });
  const page = template.replace('</head>', `${preloads.join('')}</head>`).replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div><script>window.__PRELOADED_STATE__=${json}</script>`
  );
  return { status: known ? 200 : 404, html: page };
};

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

  app.get('/{*splat}', async (req, res, next) => {
    try {
      const content = await ensureSiteContent(store);
      const page = await renderPage(req.url, content, getDeviceType(req));
      res.set('Cache-Control', 'public, max-age=60');
      res.status(page.status).send(page.html);
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
