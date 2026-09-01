const legal = require('./seed/vibenmedLegal.json');

const SITE_URL = 'https://clouddropdesigns.com';
const SITE_NAME = 'CloudDropDesigns';
const SITE_SLOGAN = 'Drop the Code & Elevate your Web';
const SITE_TAGLINE =
  'Crafted web and mobile experiences for businesses that care about quality.';
const SITE_CONTACT = {
  email: 'cloud@clouddropdesigns.com',
  location: 'California, United States',
};

const STUDIO_NAV_ITEMS = [
  {
    id: 'code-drops',
    label: 'Code Drops',
    path: '/studio/code-drops',
    title: 'Code Drops',
  },
  {
    id: 'drop-and-elevate',
    label: 'Drop & Elevate',
    path: '/studio/drop-and-elevate',
    title: 'Drop & Elevate',
  },
  {
    id: 'get-professional',
    label: 'Get Professional',
    path: '/studio/get-professional',
    title: 'Get Professional',
  },
  {
    id: 'skilled-by-design',
    label: 'Skilled By Design',
    path: '/studio/skilled-by-design',
    title: 'Skilled By Design',
  },
];

const STUDIO_PAGE_META = {
  home: {
    title: 'CloudDropDesigns',
    subtitle: 'Polished web and mobile products for teams who care about quality.',
  },
  'code-drops': {
    title: 'Code Drops',
    subtitle: 'Shipped work — web and mobile products built with intention.',
  },
  'drop-and-elevate': {
    title: 'Drop & Elevate',
    subtitle: 'Custom development and design services for teams ready to level up.',
  },
  'get-professional': {
    title: 'Get Professional',
    subtitle: 'Meet the founder and developer behind CloudDropDesigns.',
  },
  'skilled-by-design': {
    title: 'Skilled By Design',
    subtitle: 'The production stack behind shipped web and mobile work.',
  },
  sitemap: {
    title: 'Site Map',
    subtitle: 'Every page, service, product, and resource across CloudDropDesigns.',
  },
};

const CODE_DROPS_PROJECTS = [
  {
    id: 'vibenmed',
    name: 'VibeNMED',
    tagline: 'Healthcare networking for students, preceptors, and educators',
    category: 'Mobile Application',
    href: '/vibenmed',
    accent: '#2bb8c6',
  },
  {
    id: 'hemetvalleytools',
    name: 'Hemet Valley Tools',
    tagline: 'Power tool rentals, repairs, and supply for contractors and DIY',
    category: 'Web Application',
    href: 'https://hemetvalleytools.web.app',
    accent: '#f59e0b',
    brandPresentation: true,
  },
  {
    id: 'entertainment-web-app',
    name: 'Entertainment Web App',
    tagline: 'Search, browse, and bookmark movies and TV series',
    category: 'Web Application',
    href: 'https://entertainmentwebapp-444922.web.app',
    accent: '#e50914',
    screenshotPresentation: true,
    imagePosition: 'top center',
    imageBackdrop: '#10101c',
  },
  {
    id: 'sonoratiresinc',
    name: 'Sonora Tires Inc',
    tagline: 'Find, compare, and inquire about tires for your vehicle',
    category: 'Web Application',
    href: 'https://sonoratiresinc.web.app',
    accent: '#e8a23a',
  },
  {
    id: 'namerrs',
    name: 'NAMERRS',
    tagline: 'Custom graphic design, apparel, and printed products',
    category: 'Web Application',
    href: 'https://namerrs.web.app',
    inProgress: false,
    accent: '#7c3aed',
    screenshotPresentation: true,
    imagePosition: 'top center',
  },
];

const DROP_ELEVATE_SERVICES = [
  {
    id: 'web-dev',
    title: 'Website Design & Development',
    description: 'Custom sites and web apps built with clarity, performance, and long-term maintainability.',
    actionLabel: 'Start your website inquiry',
  },
  {
    id: 'mobile',
    title: 'Mobile Applications',
    description: 'Cross-platform iOS and Android experiences with polished UI and reliable delivery.',
    actionLabel: 'Start your mobile app inquiry',
  },
  {
    id: 'brand-ui',
    title: 'UI/UX & Brand Identity',
    description: 'Visual systems, product interfaces, and brand touchpoints that feel intentional.',
    actionLabel: 'Start your brand inquiry',
  },
  {
    id: 'seo-analytics',
    title: 'SEO & Analytics',
    description: 'Search visibility, Google Analytics setup, and insight into how users find you.',
    actionLabel: 'Start your SEO inquiry',
  },
  {
    id: 'redesign',
    title: 'Redesign & Maintenance',
    description: 'Modernize existing products and keep them secure, fast, and up to date.',
    actionLabel: 'Start your redesign inquiry',
  },
  {
    id: 'consulting',
    title: 'Consulting & Accessibility',
    description: 'Technical guidance, legal page setup, and inclusive design practices.',
    actionLabel: 'Start your consultation',
  },
];

const DROP_ELEVATE_TO_PROJECT_TYPE = {
  'web-dev': 'web',
  mobile: 'mobile',
  'brand-ui': 'web',
  'seo-analytics': 'web',
  redesign: 'web',
  consulting: 'unsure',
};

const DROP_ELEVATE_SERVICE_OPTIONS = [
  { value: '', label: 'Select a service' },
  ...DROP_ELEVATE_SERVICES.map((service) => ({
    value: service.id,
    label: service.title,
  })),
  { value: 'other', label: 'Other / Not sure yet' },
];

const GET_PROFESSIONAL_EXPERTISE = [
  {
    id: 'web',
    label: 'Custom web applications',
    detail: 'React-based products with thoughtful UX, performance, and maintainable architecture.',
  },
  {
    id: 'mobile',
    label: 'Mobile products',
    detail: 'Cross-platform builds from concept through store-ready deployment.',
  },
  {
    id: 'delivery',
    label: 'End-to-end delivery',
    detail: 'Design, development, and launch — scoped clearly from first conversation through delivery.',
  },
];

const GET_PROFESSIONAL_WORKING_PRINCIPLES = [
  'Understand the business problem before writing the first line of code.',
  'Ship polished, scalable work — not prototypes that become permanent.',
  'Stay accessible from first conversation through launch and beyond.',
];

const PROJECT_INQUIRY_TYPES = [
  { value: '', label: 'Select project type' },
  { value: 'web', label: 'Web application' },
  { value: 'mobile', label: 'Mobile application' },
  { value: 'both', label: 'Web and mobile' },
  { value: 'unsure', label: 'Not sure yet' },
];

const PROJECT_INQUIRY_TIMELINES = [
  { value: '', label: 'Select timeline' },
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3', label: '1–3 months' },
  { value: '3-6', label: '3–6 months' },
  { value: 'flexible', label: 'Flexible / exploring' },
];

const PROJECT_INQUIRY_BUDGETS = [
  { value: '', label: 'Budget range (optional)' },
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5-15k', label: '$5,000 – $15,000' },
  { value: '15-30k', label: '$15,000 – $30,000' },
  { value: '30k-plus', label: '$30,000+' },
  { value: 'discuss', label: 'Prefer to discuss' },
];

const GET_PROFESSIONAL_PROFILE = {
  name: 'Paul Cloud',
  title: 'Developer',
  experience: '10+ years experience in information technology',
  bio: "I start by understanding how you want your business to show up — then I design and build web and mobile experiences that reflect your vision, not a generic template. With 10+ years in information technology, I've shipped live portfolio work including VibeNMED and business-facing sites such as Hemet Valley Tools and Sonora Tires Inc, taking ideas from concept to production-ready launch. You work directly with me from first conversation through delivery, and I bring the same standards to every client project.",
  trustBio: 'Founder-led studio for custom web and mobile products.',
  mobileBio:
    "I'm Paul, the founder and developer at CloudDropDesigns, specializing in custom web and mobile solutions. Delivering scalable web and mobile solutions for businesses.",
  photoAlt: 'Paul Cloud, founder and developer at CloudDropDesigns',
};

const GET_PROFESSIONAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'cloudpc7',
    href: 'https://github.com/cloudpc7',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Paul Cloud',
    href: 'https://www.linkedin.com/in/paul-cloud-760358338',
  },
  {
    id: 'hackerrank',
    label: 'HackerRank',
    handle: '@cloud8',
    href: 'https://www.hackerrank.com/profile/cloud8',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@dropingcode',
    href: 'https://www.instagram.com/dropingcode',
  },
  {
    id: 'x',
    label: 'X',
    handle: '@Paul211391',
    href: 'https://x.com/Paul211391',
  },
];

const SKILLED_MANTRA = ['Design', 'Develop', 'Deploy', 'Repeat'];
const SKILLED_NARRATIVE =
  'This is the stack behind shipped client work — chosen for maintainable interfaces, reliable delivery, and production deployments you can grow with.';
const SKILLED_PROOF_CTA = {
  label: 'See this stack in production',
  path: '/studio/code-drops',
};
const SKILLED_TOOL_GROUPS = [
  {
    id: 'stack',
    label: 'Core stack',
    tools: [
      { id: 'javascript', label: 'JavaScript' },
      { id: 'react', label: 'React' },
      { id: 'node', label: 'Node.js' },
      { id: 'python', label: 'Python' },
    ],
  },
  {
    id: 'interface',
    label: 'Interface craft',
    tools: [
      { id: 'sass', label: 'Sass' },
      { id: 'css', label: 'CSS' },
      { id: 'figma', label: 'Figma' },
    ],
  },
  {
    id: 'platforms',
    label: 'Ship & deploy',
    tools: [
      { id: 'android', label: 'Android' },
      { id: 'apple', label: 'Apple' },
      { id: 'firebase', label: 'Firebase' },
      { id: 'git', label: 'Git' },
      { id: 'github', label: 'GitHub', href: 'https://github.com/cloudpc7' },
      { id: 'hackerrank', label: 'HackerRank', href: 'https://www.hackerrank.com/profile/cloud8' },
    ],
  },
];

const DEFAULT_SEO = {
  title: `${SITE_NAME} — Design & Development Studio`,
  description: SITE_TAGLINE,
  path: '/',
  image: `${SITE_URL}/favicon.png`,
  type: 'website',
};

const PAGE_SEO = [
  {
    path: '/',
    title: `${SITE_NAME} — Design & Development Studio`,
    description:
      'CloudDropDesigns builds polished web and mobile products for businesses. Explore our portfolio, services, and studio.',
  },
  {
    path: '/studio/code-drops',
    title: `Code Drops — Portfolio | ${SITE_NAME}`,
    description:
      'Shipped web and mobile work from CloudDropDesigns — VibeNMED, Hemet Valley Tools, Entertainment Web App, and more.',
  },
  {
    path: '/studio/drop-and-elevate',
    title: `Drop & Elevate — Services | ${SITE_NAME}`,
    description:
      'Custom website design, mobile apps, UI/UX, SEO, redesign, and consulting from CloudDropDesigns.',
  },
  {
    path: '/studio/get-professional',
    title: `Get Professional — Paul Cloud | ${SITE_NAME}`,
    description:
      'Meet Paul Cloud, founder and developer at CloudDropDesigns — 10+ years building scalable web and mobile solutions.',
  },
  {
    path: '/studio/skilled-by-design',
    title: `Skilled By Design — Toolkit | ${SITE_NAME}`,
    description: 'The technologies, tools, and craft behind every CloudDropDesigns build.',
  },
  {
    path: '/sitemap',
    title: `Site Map | ${SITE_NAME}`,
    description: 'Browse all pages, services, and products on CloudDropDesigns.',
  },
  {
    path: '/vibenmed',
    title: `VibeNMED — Healthcare Networking App | ${SITE_NAME}`,
    description: 'VibeNMED connects nursing and medical-education students, preceptors, and educators.',
  },
  {
    path: '/vibenmed/privacy',
    title: `VibeNMED Privacy Policy | ${SITE_NAME}`,
    description: 'Privacy policy for the VibeNMED mobile application.',
  },
  {
    path: '/vibenmed/terms',
    title: `VibeNMED Terms of Service | ${SITE_NAME}`,
    description: 'Terms of service for the VibeNMED mobile application.',
  },
];

const FOOTER_STUDIO_LINKS = [
  { id: 'home', label: 'Home', path: '/' },
  ...STUDIO_NAV_ITEMS.map((item) => ({
    id: item.id,
    label: item.label,
    path: item.path,
  })),
  { id: 'sitemap', label: 'Site Map', path: '/sitemap' },
];

const FOOTER_SERVICE_LINKS = DROP_ELEVATE_SERVICES.map((service) => ({
  id: service.id,
  label: service.title,
  path: `/studio/drop-and-elevate#${service.id}`,
}));

const SITE_MAP_SECTIONS = [
  { id: 'pages', title: 'Pages', links: FOOTER_STUDIO_LINKS },
  { id: 'services', title: 'Services', links: FOOTER_SERVICE_LINKS },
  {
    id: 'products',
    title: 'Products',
    links: CODE_DROPS_PROJECTS.map((project) => ({
      id: project.id,
      label: project.name,
      path: project.href ?? '/studio/code-drops',
      external: Boolean(project.href?.startsWith('http')),
      comingSoon: Boolean(project.inProgress || project.comingSoon),
    })),
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

const SITE_CONTENT_PK = 'site';

const buildSeedSiteContent = () => ({
  siteConfig: {
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    slogan: SITE_SLOGAN,
    tagline: SITE_TAGLINE,
    contact: SITE_CONTACT,
  },
  studioNav: {
    items: STUDIO_NAV_ITEMS,
  },
  studioPageMeta: STUDIO_PAGE_META,
  codeDrops: {
    projects: CODE_DROPS_PROJECTS,
  },
  dropElevate: {
    services: DROP_ELEVATE_SERVICES,
    serviceOptions: DROP_ELEVATE_SERVICE_OPTIONS,
    toProjectType: DROP_ELEVATE_TO_PROJECT_TYPE,
  },
  getProfessional: {
    expertise: GET_PROFESSIONAL_EXPERTISE,
    workingPrinciples: GET_PROFESSIONAL_WORKING_PRINCIPLES,
    inquiryTypes: PROJECT_INQUIRY_TYPES,
    inquiryTimelines: PROJECT_INQUIRY_TIMELINES,
    inquiryBudgets: PROJECT_INQUIRY_BUDGETS,
    profile: GET_PROFESSIONAL_PROFILE,
    links: GET_PROFESSIONAL_LINKS,
  },
  skilledByDesign: {
    mantra: SKILLED_MANTRA,
    narrative: SKILLED_NARRATIVE,
    proofCta: SKILLED_PROOF_CTA,
    toolGroups: SKILLED_TOOL_GROUPS,
  },
  siteSeo: {
    defaultSeo: DEFAULT_SEO,
    pageSeo: PAGE_SEO,
    organizationJsonLd: {
      context: 'https://schema.org',
      type: 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      email: 'cloud@clouddropdesigns.com',
      address: {
        type: 'PostalAddress',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      sameAs: [
        'https://github.com/cloudpc7',
        'https://www.linkedin.com/in/paul-cloud-760358338',
        'https://www.instagram.com/dropingcode',
        'https://x.com/Paul211391',
      ],
    },
  },
  siteFooter: {
    studioLinks: FOOTER_STUDIO_LINKS,
    serviceLinks: FOOTER_SERVICE_LINKS,
    socialLinks: GET_PROFESSIONAL_LINKS,
  },
  siteMap: {
    sections: SITE_MAP_SECTIONS,
  },
  vibenmedLegal: {
    privacyPolicyHtml: legal.privacyPolicyHtml,
    termsBodyHtml: legal.termsBodyHtml,
  },
  meta: {
    source: 'seed',
    updatedAt: '2026-09-01T00:00:00.000Z',
  },
});

module.exports = {
  SITE_CONTENT_PK,
  buildSeedSiteContent,
};
