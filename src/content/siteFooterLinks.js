import { CODE_DROPS_PROJECTS } from './codeDropsProjects';
import { DROP_ELEVATE_SERVICES } from './dropElevateServices';
import { GET_PROFESSIONAL_LINKS } from './getProfessionalContent';
import { STUDIO_NAV_ITEMS } from './studioNav';

export const FOOTER_STUDIO_LINKS = [
  { id: 'home', label: 'Home', path: '/' },
  ...STUDIO_NAV_ITEMS.map((item) => ({
    id: item.id,
    label: item.label,
    path: item.path,
  })),
  { id: 'sitemap', label: 'Site Map', path: '/sitemap' },
];

export const FOOTER_SERVICE_LINKS = DROP_ELEVATE_SERVICES.map((service) => ({
  id: service.id,
  label: service.title,
  path: `/studio/drop-and-elevate#${service.id}`,
}));

export const FOOTER_PRODUCT_LINKS = CODE_DROPS_PROJECTS.map((project) => ({
  id: project.id,
  label: project.name,
  path: project.href ?? '/studio/code-drops',
  external: Boolean(project.href?.startsWith('http')),
  comingSoon: project.inProgress || project.comingSoon,
}));

export const FOOTER_SOCIAL_LINKS = GET_PROFESSIONAL_LINKS.map((link) => ({
  id: link.id,
  label: link.label,
  handle: link.handle,
  href: link.href,
  icon: link.icon,
}));