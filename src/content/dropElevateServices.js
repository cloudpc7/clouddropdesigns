export const DROP_ELEVATE_SERVICES = [
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

export const DROP_ELEVATE_TO_PROJECT_TYPE = {
  'web-dev': 'web',
  mobile: 'mobile',
  'brand-ui': 'web',
  'seo-analytics': 'web',
  redesign: 'web',
  consulting: 'unsure',
};

export const DROP_ELEVATE_SERVICE_OPTIONS = [
  { value: '', label: 'Select a service' },
  ...DROP_ELEVATE_SERVICES.map((service) => ({
    value: service.id,
    label: service.title,
  })),
  { value: 'other', label: 'Other / Not sure yet' },
];