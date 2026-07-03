/**
 * Serializable site content for Firebase Realtime Database.
 * Image fields use stable public asset paths (served from Hosting / Vite build).
 * Source of truth until Express + Redux consume this via API.
 */

const SITE_URL = 'https://clouddropdesigns.com';
const SITE_NAME = 'CloudDropDesigns';
const SITE_TAGLINE =
  'Crafted web and mobile experiences for businesses that care about quality.';

export const siteConfig = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  slogan: 'Drop the Code & Elevate your Web',
  tagline: SITE_TAGLINE,
  contact: {
    email: 'cloud@clouddropdesigns.com',
    location: 'California, United States',
  },
};

export const studioNav = {
  items: [
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
  ],
};

export const studioPageMeta = {
  home: {
    title: 'CloudDropDesigns',
    subtitle:
      'We craft digital experiences that feel as considered as print. Polished web and mobile products built for teams who care about clarity, craft, and long-term quality.',
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
    subtitle: 'The stack, tools, and craft behind every CloudDrop build.',
  },
  sitemap: {
    title: 'Site Map',
    subtitle:
      'Every page, service, product, and resource across CloudDropDesigns.',
  },
  siteContact: {
    email: 'cloud@clouddropdesigns.com',
    location: 'California, United States',
  },
};

export const codeDrops = {
  projects: [
    {
      id: 'vibenmed',
      name: 'VibeNMED',
      tagline: 'Healthcare networking for students, preceptors, and educators',
      category: 'Mobile Application',
      image: 'assets/vibenmed/loginscreen.png',
      thumb: 'assets/vibenmed/icon.png',
      href: '/vibenmed',
      accent: '#2bb8c6',
    },
    {
      id: 'hemetvalleytools',
      name: 'Hemet Valley Tools',
      tagline: 'Power tool rentals, repairs, and supply for contractors and DIY',
      category: 'Web Application',
      image: 'assets/hemetvalley/logo.png',
      thumb: 'assets/hemetvalley/logo.png',
      mobileImage: 'assets/hemetvalley/mobile.png',
      href: 'https://hemetvalleytools.web.app',
      accent: '#f59e0b',
      brandPresentation: true,
    },
    {
      id: 'entertainment-web-app',
      name: 'Entertainment Web App',
      tagline: 'Search, browse, and bookmark movies and TV series',
      category: 'Web Application',
      image: 'assets/entertainment/screenshot.png',
      thumb: 'assets/entertainment/screenshot.png',
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
      image: 'assets/sonoratiresinc/mobile.png',
      thumb: 'assets/sonoratiresinc/mobile.png',
      href: 'https://sonoratiresinc.web.app',
      accent: '#e8a23a',
    },
    {
      id: 'namerrs',
      name: 'NAMERRS',
      tagline: 'Custom graphic design, apparel, and printed products',
      category: 'In Development',
      image: 'assets/namerrs/screenshot.png',
      thumb: 'assets/namerrs/screenshot.png',
      href: null,
      accent: '#7c3aed',
      inProgress: true,
    },
  ],
};

export const dropElevate = {
  services: [
    {
      id: 'web-dev',
      title: 'Website Design & Development',
      description:
        'Custom sites and web apps built with clarity, performance, and long-term maintainability.',
      actionLabel: 'Start your website inquiry',
    },
    {
      id: 'mobile',
      title: 'Mobile Applications',
      description:
        'Cross-platform iOS and Android experiences with polished UI and reliable delivery.',
      actionLabel: 'Start your mobile app inquiry',
    },
    {
      id: 'brand-ui',
      title: 'UI/UX & Brand Identity',
      description:
        'Visual systems, product interfaces, and brand touchpoints that feel intentional.',
      actionLabel: 'Start your brand inquiry',
    },
    {
      id: 'seo-analytics',
      title: 'SEO & Analytics',
      description:
        'Search visibility, Google Analytics setup, and insight into how users find you.',
      actionLabel: 'Start your SEO inquiry',
    },
    {
      id: 'redesign',
      title: 'Redesign & Maintenance',
      description:
        'Modernize existing products and keep them secure, fast, and up to date.',
      actionLabel: 'Start your redesign inquiry',
    },
    {
      id: 'consulting',
      title: 'Consulting & Accessibility',
      description:
        'Technical guidance, legal page setup, and inclusive design practices.',
      actionLabel: 'Start your consultation',
    },
  ],
  toProjectType: {
    'web-dev': 'web',
    mobile: 'mobile',
    'brand-ui': 'web',
    'seo-analytics': 'web',
    redesign: 'web',
    consulting: 'unsure',
  },
  serviceOptions: [
    { value: '', label: 'Select a service' },
    { value: 'web-dev', label: 'Website Design & Development' },
    { value: 'mobile', label: 'Mobile Applications' },
    { value: 'brand-ui', label: 'UI/UX & Brand Identity' },
    { value: 'seo-analytics', label: 'SEO & Analytics' },
    { value: 'redesign', label: 'Redesign & Maintenance' },
    { value: 'consulting', label: 'Consulting & Accessibility' },
    { value: 'other', label: 'Other / Not sure yet' },
  ],
};

export const getProfessional = {
  expertise: [
    {
      id: 'web',
      label: 'Custom web applications',
      detail:
        'React-based products with thoughtful UX, performance, and maintainable architecture.',
    },
    {
      id: 'mobile',
      label: 'Mobile products',
      detail: 'Cross-platform builds from concept through store-ready deployment.',
    },
    {
      id: 'delivery',
      label: 'End-to-end delivery',
      detail:
        'Design, development, and launch — scoped clearly from first conversation through delivery.',
    },
  ],
  workingPrinciples: [
    'Understand the business problem before writing the first line of code.',
    'Ship polished, scalable work — not prototypes that become permanent.',
    'Stay accessible from first conversation through launch and beyond.',
  ],
  inquiryTypes: [
    { value: '', label: 'Select project type' },
    { value: 'web', label: 'Web application' },
    { value: 'mobile', label: 'Mobile application' },
    { value: 'both', label: 'Web and mobile' },
    { value: 'unsure', label: 'Not sure yet' },
  ],
  inquiryTimelines: [
    { value: '', label: 'Select timeline' },
    { value: 'asap', label: 'As soon as possible' },
    { value: '1-3', label: '1–3 months' },
    { value: '3-6', label: '3–6 months' },
    { value: 'flexible', label: 'Flexible / exploring' },
  ],
  inquiryBudgets: [
    { value: '', label: 'Budget range (optional)' },
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5-15k', label: '$5,000 – $15,000' },
    { value: '15-30k', label: '$15,000 – $30,000' },
    { value: '30k-plus', label: '$30,000+' },
    { value: 'discuss', label: 'Prefer to discuss' },
  ],
  profile: {
    name: 'Paul Cloud',
    title: 'Developer',
    experience: '10+ years experience in information technology',
    bio: "I start by understanding how you want your business to show up — then I design and build web and mobile experiences that reflect your vision, not a generic template. With 10+ years in information technology, I've shipped live portfolio work including VibeNMED and business-facing sites such as Hemet Valley Tools and Sonora Tires Inc, taking ideas from concept to production-ready launch. You work directly with me from first conversation through delivery, and I bring the same standards to every client project.",
    mobileBio:
      "I'm Paul, the founder and developer at CloudDropDesigns, specializing in custom web and mobile solutions. Delivering scalable web and mobile solutions for businesses.",
    photo: 'assets/selfie.webp',
    photoAlt: 'Paul Cloud, founder and developer at CloudDropDesigns',
  },
  links: [
    {
      id: 'github',
      label: 'GitHub',
      handle: 'cloudpc7',
      href: 'https://github.com/cloudpc7',
      icon: 'assets/skilled-by-design/f974607f747d7a7beef85b0bcf0d23b36168f18b.svg',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'Paul Cloud',
      href: 'https://www.linkedin.com/in/paul-cloud-760358338',
      icon: 'assets/get-professional/linkedin.svg',
    },
    {
      id: 'hackerrank',
      label: 'HackerRank',
      handle: '@cloud8',
      href: 'https://www.hackerrank.com/profile/cloud8',
      icon: 'assets/skilled-by-design/2810ac2be86e4d20f03e72196294bead1965ccb9.svg',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@dropingcode',
      href: 'https://www.instagram.com/dropingcode',
      icon: 'assets/get-professional/instagram.svg',
    },
    {
      id: 'x',
      label: 'X',
      handle: '@Paul211391',
      href: 'https://x.com/Paul211391',
      icon: 'assets/get-professional/x.svg',
    },
  ],
};

export const skilledByDesign = {
  mantra: ['Design', 'Develop', 'Deploy', 'Repeat'],
  toolGroups: [
    {
      id: 'stack',
      label: 'Core stack',
      tools: [
        { id: 'javascript', label: 'JavaScript', icon: 'assets/skilled-by-design/be8661c5e654e9f1d6ffb66ba9319a53733b29be.svg' },
        { id: 'react', label: 'React', icon: 'assets/skilled-by-design/e76a895b264429b48428021c888b340bdd541f1f.svg' },
        { id: 'python', label: 'Python', icon: 'assets/skilled-by-design/b6e6833fa213211f096807f274396dce59f9b6e2.svg' },
        { id: 'node', label: 'Node.js', icon: 'assets/skilled-by-design/d3a8547778d5c8c9596f718ee17418ed72ac1f19.svg' },
        { id: 'npm', label: 'npm', icon: 'assets/skilled-by-design/9c9c90ff4005cdbc53ec484cd06c768fd4f4efae.svg' },
      ],
    },
    {
      id: 'interface',
      label: 'Interface craft',
      tools: [
        { id: 'sass', label: 'Sass', icon: 'assets/skilled-by-design/cb660c002a44ac367f1fe200a7e1f6c4bd1c42df.svg' },
        { id: 'css', label: 'CSS', icon: 'assets/skilled-by-design/89b6546ed7aa9837e9fcd028425a6b42e7f9dc61.svg' },
        { id: 'figma', label: 'Figma', icon: 'assets/skilled-by-design/797a0efb75623fda6f6bed4e037fd13a8219ca17.svg' },
        { id: 'squarespace', label: 'Squarespace', icon: 'assets/skilled-by-design/615e4d5b50b2f921bcdc650de44c7e7a8e829ffc.svg' },
      ],
    },
    {
      id: 'platforms',
      label: 'Platforms',
      tools: [
        { id: 'android', label: 'Android', icon: 'assets/skilled-by-design/3c5d54bff099896860a55cb890c8635202086ced.svg' },
        { id: 'apple', label: 'Apple', icon: 'assets/skilled-by-design/d3800b8e6ab701981792cb002d94f5ba02a5d473.svg' },
        { id: 'windows', label: 'Windows', icon: 'assets/skilled-by-design/e63fa5c78dbf4b86a7fd6fa00f57c7425203ac08.svg' },
        { id: 'google', label: 'Google Cloud', icon: 'assets/skilled-by-design/8514b71e59f0214443a951c2f56e883a465c7177.svg' },
        { id: 'github', label: 'GitHub', icon: 'assets/skilled-by-design/f974607f747d7a7beef85b0bcf0d23b36168f18b.svg' },
        { id: 'git', label: 'Git', icon: 'assets/skilled-by-design/36da1c0615bc9ff225b0b27cf7760f636320b640.svg' },
      ],
    },
    {
      id: 'growth',
      label: 'Continuous craft',
      tools: [
        { id: 'hackerrank', label: 'HackerRank', icon: 'assets/skilled-by-design/2810ac2be86e4d20f03e72196294bead1965ccb9.svg' },
        { id: 'leetcode', label: 'LeetCode', icon: 'assets/skilled-by-design/0aa9e63b097f9b037eb45d783e01ee2b482a3fce.svg' },
        { id: 'stackoverflow', label: 'Stack Overflow', icon: 'assets/skilled-by-design/f3f7b193810d890d19fa9dab07f3d3342736034a.svg' },
        { id: 'freecodecamp', label: 'freeCodeCamp', icon: 'assets/skilled-by-design/44a8e6ece1880c42579fd6a0c663d666ec7806ac.svg' },
      ],
    },
  ],
};

const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;

export const siteSeo = {
  defaultSeo: {
    title: `${SITE_NAME} — Design & Development Studio`,
    description: SITE_TAGLINE,
    path: '/',
    image: DEFAULT_IMAGE,
    type: 'website',
  },
  // RTDB keys cannot contain "/"; store pages as an array keyed by `path`.
  pageSeo: [
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
      description:
        'The technologies, tools, and craft behind every CloudDropDesigns build.',
    },
    {
      path: '/sitemap',
      title: `Site Map | ${SITE_NAME}`,
      description: 'Browse all pages, services, and products on CloudDropDesigns.',
    },
    {
      path: '/vibenmed',
      title: `VibeNMED — Healthcare Networking App | ${SITE_NAME}`,
      description:
        'VibeNMED connects nursing and medical-education students, preceptors, and educators.',
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
  ],
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
};

const buildSiteFooter = () => ({
  studioLinks: [
    { id: 'home', label: 'Home', path: '/' },
    ...studioNav.items.map((item) => ({
      id: item.id,
      label: item.label,
      path: item.path,
    })),
    { id: 'sitemap', label: 'Site Map', path: '/sitemap' },
  ],
  serviceLinks: dropElevate.services.map((service) => ({
    id: service.id,
    label: service.title,
    path: `/studio/drop-and-elevate#${service.id}`,
  })),
  productLinks: codeDrops.projects.map((project) => ({
    id: project.id,
    label: project.name,
    path: project.href ?? '/studio/code-drops',
    external: Boolean(project.href?.startsWith('http')),
    comingSoon: Boolean(project.inProgress || project.comingSoon),
  })),
  socialLinks: getProfessional.links.map((link) => ({
    id: link.id,
    label: link.label,
    handle: link.handle,
    href: link.href,
    icon: link.icon,
  })),
});

const buildSiteMap = (footer) => ({
  sections: [
    { id: 'pages', title: 'Pages', links: footer.studioLinks },
    { id: 'services', title: 'Services', links: footer.serviceLinks },
    { id: 'products', title: 'Products', links: footer.productLinks },
    {
      id: 'legal',
      title: 'Legal',
      links: [
        {
          id: 'vibenmed-privacy',
          label: 'VibeNMED Privacy Policy',
          path: '/vibenmed/privacy',
        },
        {
          id: 'vibenmed-terms',
          label: 'VibeNMED Terms of Service',
          path: '/vibenmed/terms',
        },
      ],
    },
  ],
});

/**
 * @param {object} [vibenmedLegal]
 * @returns {object} Full RTDB payload under /content
 */
export const buildContentPayload = (vibenmedLegal = {}) => {
  const siteFooter = buildSiteFooter();
  const siteMap = buildSiteMap(siteFooter);

  return {
    meta: {
      version: '1.0.0',
      updatedAt: new Date().toISOString(),
      source: 'database/contentData.mjs',
    },
    siteConfig,
    studioNav,
    studioPageMeta,
    codeDrops,
    dropElevate,
    getProfessional,
    skilledByDesign,
    siteSeo,
    siteFooter,
    siteMap,
    vibenmedLegal: {
      privacyPolicyHtml: vibenmedLegal.PRIVACY_POLICY_HTML ?? '',
      termsOfServiceHtml: vibenmedLegal.TERMS_OF_SERVICE_HTML ?? '',
      termsBodyHtml: vibenmedLegal.TERMS_BODY_HTML ?? '',
    },
  };
};

/** Express route keys → RTDB child paths */
export const CONTENT_SECTIONS = [
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
];