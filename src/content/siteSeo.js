import { SITE_NAME, SITE_TAGLINE, SITE_URL } from './siteConfig';

const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;

export const DEFAULT_SEO = {
  title: `${SITE_NAME} — Design & Development Studio`,
  description: SITE_TAGLINE,
  path: '/',
  image: DEFAULT_IMAGE,
  type: 'website',
};

export const PAGE_SEO = {
  '/': {
    title: `${SITE_NAME} — Design & Development Studio`,
    description:
      'CloudDropDesigns builds polished web and mobile products for businesses. Explore our portfolio, services, and studio.',
    path: '/',
  },
  '/studio/code-drops': {
    title: `Code Drops — Portfolio | ${SITE_NAME}`,
    description:
      'Shipped web and mobile work from CloudDropDesigns — VibeNMED, Hemet Valley Tools, Entertainment Web App, and more.',
    path: '/studio/code-drops',
  },
  '/studio/drop-and-elevate': {
    title: `Drop & Elevate — Services | ${SITE_NAME}`,
    description:
      'Custom website design, mobile apps, UI/UX, SEO, redesign, and consulting from CloudDropDesigns.',
    path: '/studio/drop-and-elevate',
  },
  '/studio/get-professional': {
    title: `Get Professional — Paul Cloud | ${SITE_NAME}`,
    description:
      'Meet Paul Cloud, founder and developer at CloudDropDesigns — 10+ years building scalable web and mobile solutions.',
    path: '/studio/get-professional',
  },
  '/studio/skilled-by-design': {
    title: `Skilled By Design — Toolkit | ${SITE_NAME}`,
    description:
      'The technologies, tools, and craft behind every CloudDropDesigns build.',
    path: '/studio/skilled-by-design',
  },
  '/sitemap': {
    title: `Site Map | ${SITE_NAME}`,
    description: 'Browse all pages, services, and products on CloudDropDesigns.',
    path: '/sitemap',
  },
  '/vibenmed': {
    title: `VibeNMED — Healthcare Networking App | ${SITE_NAME}`,
    description:
      'VibeNMED connects nursing and medical-education students, preceptors, and educators.',
    path: '/vibenmed',
  },
  '/vibenmed/privacy': {
    title: `VibeNMED Privacy Policy | ${SITE_NAME}`,
    description: 'Privacy policy for the VibeNMED mobile application.',
    path: '/vibenmed/privacy',
  },
  '/vibenmed/terms': {
    title: `VibeNMED Terms of Service | ${SITE_NAME}`,
    description: 'Terms of service for the VibeNMED mobile application.',
    path: '/vibenmed/terms',
  },
};

export const getSeoForPath = (pathname) => {
  const meta = PAGE_SEO[pathname] ?? DEFAULT_SEO;
  return {
    ...DEFAULT_SEO,
    ...meta,
    canonical: `${SITE_URL}${meta.path ?? pathname}`,
  };
};

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  email: 'cloud@clouddropdesigns.com',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  sameAs: [
    'https://github.com/cloudpc7',
    'https://www.linkedin.com/in/paul-cloud-760358338',
    'https://www.instagram.com/dropingcode',
    'https://x.com/Paul211391',
  ],
};