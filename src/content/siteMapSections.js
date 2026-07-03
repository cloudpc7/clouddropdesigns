import { FOOTER_PRODUCT_LINKS, FOOTER_SERVICE_LINKS, FOOTER_STUDIO_LINKS } from './siteFooterLinks';

export const SITE_MAP_SECTIONS = [
  {
    id: 'pages',
    title: 'Pages',
    links: FOOTER_STUDIO_LINKS,
  },
  {
    id: 'services',
    title: 'Services',
    links: FOOTER_SERVICE_LINKS,
  },
  {
    id: 'products',
    title: 'Products',
    links: FOOTER_PRODUCT_LINKS,
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { id: 'vibenmed-privacy', label: 'VibeNMED Privacy Policy', path: '/vibenmed/privacy' },
      { id: 'vibenmed-terms', label: 'VibeNMED Terms of Service', path: '/vibenmed/terms' },
    ],
  },
];