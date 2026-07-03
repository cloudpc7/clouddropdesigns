/** RTDB /content child keys served by the API */
const CONTENT_SECTIONS = [
  'siteConfig',
  'studioNav',
  'studioPageMeta',
  'codeDrops',
  'dropElevate',
  'getProfessional',
  'skilledByDesign',
  'siteSeo',
  'siteFooter',
  'siteMap',
  'vibenmedLegal',
  'meta',
];

/** Accept kebab-case aliases from studio routes and URLs */
const SECTION_ALIASES = {
  'site-config': 'siteConfig',
  'studio-nav': 'studioNav',
  'studio-page-meta': 'studioPageMeta',
  'code-drops': 'codeDrops',
  'drop-and-elevate': 'dropElevate',
  'drop-elevate': 'dropElevate',
  'get-professional': 'getProfessional',
  'skilled-by-design': 'skilledByDesign',
  'site-seo': 'siteSeo',
  'site-footer': 'siteFooter',
  'site-map': 'siteMap',
  'vibenmed-legal': 'vibenmedLegal',
};

const resolveSectionKey = (raw) => {
  const key = String(raw ?? '').trim();
  if (!key) return null;
  if (CONTENT_SECTIONS.includes(key)) return key;
  return SECTION_ALIASES[key] ?? null;
};

module.exports = {
  CONTENT_SECTIONS,
  SECTION_ALIASES,
  resolveSectionKey,
};