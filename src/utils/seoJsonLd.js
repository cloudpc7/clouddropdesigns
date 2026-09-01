import { PAGE_SEO } from '../content/siteSeo';
import { SITE_NAME, SITE_URL } from '../content/siteConfig';
import { GET_PROFESSIONAL_PROFILE } from '../content/getProfessionalContent';
import {
  VIBENMED_APP_STORE_URL,
  VIBENMED_GOOGLE_PLAY_URL,
} from '../config/vibenmedStoreLinks';

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const breadcrumbJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: PAGE_SEO['/'].description,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
});

const personJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: GET_PROFESSIONAL_PROFILE.name,
  jobTitle: GET_PROFESSIONAL_PROFILE.title,
  description: GET_PROFESSIONAL_PROFILE.bio,
  worksFor: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  url: `${SITE_URL}/studio/get-professional`,
});

const professionalServiceJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: `${SITE_URL}/studio/drop-and-elevate`,
  description: PAGE_SEO['/studio/drop-and-elevate'].description,
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
});

const softwareApplicationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'VibeNMED',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android',
  description: PAGE_SEO['/vibenmed'].description,
  url: `${SITE_URL}/vibenmed`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  downloadUrl: [VIBENMED_GOOGLE_PLAY_URL, VIBENMED_APP_STORE_URL],
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
});

const PAGE_JSON_LD_BUILDERS = {
  '/': () => [websiteJsonLd()],
  '/studio/drop-and-elevate': () => [
    professionalServiceJsonLd(),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Drop & Elevate', path: '/studio/drop-and-elevate' },
    ]),
  ],
  '/studio/get-professional': () => [
    personJsonLd(),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Get Professional', path: '/studio/get-professional' },
    ]),
  ],
  '/studio/code-drops': () => [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Code Drops', path: '/studio/code-drops' },
    ]),
  ],
  '/studio/skilled-by-design': () => [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Skilled By Design', path: '/studio/skilled-by-design' },
    ]),
  ],
  '/vibenmed': () => [
    softwareApplicationJsonLd(),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'VibeNMED', path: '/vibenmed' },
    ]),
  ],
};

export const getPageJsonLd = (pathname) => PAGE_JSON_LD_BUILDERS[pathname]?.() ?? [];

export const getDefaultOgImage = () => DEFAULT_OG_IMAGE;