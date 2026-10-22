import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const env = loadEnv(process.env.NODE_ENV || 'production', rootDir, '');
const gscVerification = env.VITE_GSC_VERIFICATION?.trim() ?? '';
const siteUrl = 'https://clouddropdesigns.com';
const ogImage = `${siteUrl}/og-image.png`;

const ROUTE_SEO = [
  {
    path: '/',
    title: 'CloudDropDesigns — Design & Development Studio',
    description:
      'CloudDropDesigns builds polished web and mobile products for businesses. Explore our portfolio, services, and studio.',
    summary:
      'CloudDropDesigns is a California design and development studio building polished web and mobile products for businesses.',
  },
  {
    path: '/studio/code-drops',
    title: 'Code Drops — Portfolio | CloudDropDesigns',
    description:
      'Shipped web and mobile work from CloudDropDesigns — VibeNMED, Hemet Valley Tools, Entertainment Web App, and more.',
    summary: 'Portfolio of shipped web and mobile projects from CloudDropDesigns.',
  },
  {
    path: '/studio/drop-and-elevate',
    title: 'Drop & Elevate — Services | CloudDropDesigns',
    description:
      'Custom website design, mobile apps, UI/UX, SEO, redesign, and consulting from CloudDropDesigns.',
    summary: 'Custom website design, mobile apps, UI/UX, SEO, redesign, and consulting services.',
  },
  {
    path: '/studio/get-professional',
    title: 'Get Professional — Paul Cloud | CloudDropDesigns',
    description:
      'Meet Paul Cloud, founder and developer at CloudDropDesigns — 10+ years building scalable web and mobile solutions.',
    summary: 'Meet Paul Cloud, founder and developer behind CloudDropDesigns.',
  },
  {
    path: '/studio/skilled-by-design',
    title: 'Skilled By Design — Toolkit | CloudDropDesigns',
    description: 'The technologies, tools, and craft behind every CloudDropDesigns build.',
    summary: 'The technologies, tools, and craft behind CloudDropDesigns builds.',
  },
  {
    path: '/sitemap',
    title: 'Site Map | CloudDropDesigns',
    description: 'Browse all pages, services, and products on CloudDropDesigns.',
    summary: 'Browse all pages, services, and products on CloudDropDesigns.',
  },
  {
    path: '/vibenmed',
    title: 'VibeNMED — Healthcare Networking App | CloudDropDesigns',
    description:
      'VibeNMED connects nursing and medical-education students, preceptors, and educators.',
    summary: 'VibeNMED is a healthcare networking app for students, preceptors, and educators.',
  },
  {
    path: '/vibenmed/privacy',
    title: 'VibeNMED Privacy Policy | CloudDropDesigns',
    description: 'Privacy policy for the VibeNMED mobile application.',
    summary: 'Privacy policy for the VibeNMED mobile application.',
  },
  {
    path: '/vibenmed/terms',
    title: 'VibeNMED Terms of Service | CloudDropDesigns',
    description: 'Terms of service for the VibeNMED mobile application.',
    summary: 'Terms of service for the VibeNMED mobile application.',
  },
];

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const injectGscVerification = (html) => {
  if (!gscVerification) {
    return html;
  }

  const meta = `<meta name="google-site-verification" content="${escapeHtml(gscVerification)}" />`;
  return html.replace('</head>', `    ${meta}\n  </head>`);
};

const buildShell = (template, route) => {
  const canonical = `${siteUrl}${route.path === '/' ? '/' : route.path}`;
  const noscript = `
    <noscript>
      <main style="max-width:42rem;margin:2rem auto;padding:0 1rem;font-family:system-ui,sans-serif;line-height:1.5;">
        <h1>${escapeHtml(route.title)}</h1>
        <p>${escapeHtml(route.summary)}</p>
        <p><a href="${canonical}">Continue to ${escapeHtml(route.title)}</a></p>
      </main>
    </noscript>`;

  const shell = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${canonical}" />`,
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image" content="${ogImage}" />`,
    )
    .replace(
      /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:card" content="summary_large_image" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonical}" />`,
    )
    .replace('</body>', `${noscript}\n  </body>`);

  return injectGscVerification(shell);
};

const routeToOutputPath = (routePath) => {
  if (routePath === '/') {
    return path.join(distDir, 'index.html');
  }

  const segments = routePath.replace(/^\//, '').split('/');
  return path.join(distDir, ...segments, 'index.html');
};

const template = injectGscVerification(
  await readFile(path.join(distDir, 'index.html'), 'utf8'),
);

for (const route of ROUTE_SEO) {
  const outputPath = routeToOutputPath(route.path);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buildShell(template, route), 'utf8');
}

const today = new Date().toISOString().slice(0, 10);
const lastmod = `${today}T00:00:00Z`;
const sitemapPublicPath = path.join(rootDir, 'public', 'sitemap.xml');
const sitemapDistPath = path.join(distDir, 'sitemap.xml');
const sitemapXml = await readFile(sitemapPublicPath, 'utf8');
const updatedSitemap = sitemapXml.replace(
  /<lastmod>[^<]+<\/lastmod>/g,
  `<lastmod>${lastmod}</lastmod>`,
);
await writeFile(sitemapPublicPath, updatedSitemap, 'utf8');
await writeFile(sitemapDistPath, updatedSitemap, 'utf8');

console.log(`Generated ${ROUTE_SEO.length} SEO HTML shells in dist/.`);
console.log(`Updated sitemap lastmod to ${today}.`);
if (gscVerification) {
  console.log('Injected Google Search Console verification meta tag.');
}