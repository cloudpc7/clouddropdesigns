import { CODE_DROPS_PROJECTS } from './codeDropsProjects';
import {
  DROP_ELEVATE_SERVICE_OPTIONS,
  DROP_ELEVATE_SERVICES,
  DROP_ELEVATE_TO_PROJECT_TYPE,
} from './dropElevateServices';
import {
  GET_PROFESSIONAL_EXPERTISE,
  GET_PROFESSIONAL_LINKS,
  GET_PROFESSIONAL_PROFILE,
  GET_PROFESSIONAL_WORKING_PRINCIPLES,
  PROJECT_INQUIRY_BUDGETS,
  PROJECT_INQUIRY_TIMELINES,
  PROJECT_INQUIRY_TYPES,
} from './getProfessionalContent';
import { SITE_MAP_SECTIONS } from './siteMapSections';
import {
  DEFAULT_SEO,
  ORGANIZATION_JSON_LD,
  PAGE_SEO,
} from './siteSeo';
import {
  FOOTER_SERVICE_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_STUDIO_LINKS,
} from './siteFooterLinks';
import { STUDIO_NAV_ITEMS } from './studioNav';
import { STUDIO_PAGE_META } from './studioPageMeta';
import {
  SKILLED_MANTRA,
  SKILLED_NARRATIVE,
  SKILLED_PROOF_CTA,
  SKILLED_TOOL_GROUPS,
} from './skilledByDesignContent';
import { PRIVACY_POLICY_HTML, TERMS_BODY_HTML } from './vibenmedLegalContent';
import { SITE_CONTACT, SITE_NAME, SITE_SLOGAN, SITE_TAGLINE, SITE_URL } from './siteConfig';

const toApiOrganizationJsonLd = (jsonLd) => ({
  context: jsonLd['@context'],
  type: jsonLd['@type'],
  name: jsonLd.name,
  url: jsonLd.url,
  email: jsonLd.email,
  address: {
    type: jsonLd.address['@type'],
    addressRegion: jsonLd.address.addressRegion,
    addressCountry: jsonLd.address.addressCountry,
  },
  sameAs: jsonLd.sameAs,
});

export const STATIC_BOOTSTRAP_SECTIONS = {
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
    projects: CODE_DROPS_PROJECTS.map(({ image, thumb, mobileImage, ...project }) => project),
  },
  dropElevate: {
    services: DROP_ELEVATE_SERVICES,
    serviceOptions: DROP_ELEVATE_SERVICE_OPTIONS,
    toProjectType: DROP_ELEVATE_TO_PROJECT_TYPE,
  },
  getProfessional: {
    expertise: GET_PROFESSIONAL_EXPERTISE,
    workingPrinciples: GET_PROFESSIONAL_WORKING_PRINCIPLES,
    profile: GET_PROFESSIONAL_PROFILE,
    links: GET_PROFESSIONAL_LINKS,
    inquiryTypes: PROJECT_INQUIRY_TYPES,
    inquiryTimelines: PROJECT_INQUIRY_TIMELINES,
    inquiryBudgets: PROJECT_INQUIRY_BUDGETS,
  },
  skilledByDesign: {
    mantra: SKILLED_MANTRA,
    narrative: SKILLED_NARRATIVE,
    proofCta: SKILLED_PROOF_CTA,
    toolGroups: SKILLED_TOOL_GROUPS.map((group) => ({
      id: group.id,
      label: group.label,
      tools: group.tools.map(({ icon, ...tool }) => tool),
    })),
  },
  siteSeo: {
    defaultSeo: DEFAULT_SEO,
    pageSeo: Object.values(PAGE_SEO),
    organizationJsonLd: toApiOrganizationJsonLd(ORGANIZATION_JSON_LD),
  },
  siteFooter: {
    studioLinks: FOOTER_STUDIO_LINKS,
    serviceLinks: FOOTER_SERVICE_LINKS,
    socialLinks: FOOTER_SOCIAL_LINKS,
  },
  siteMap: {
    sections: SITE_MAP_SECTIONS,
  },
  vibenmedLegal: {
    privacyPolicyHtml: PRIVACY_POLICY_HTML,
    termsBodyHtml: TERMS_BODY_HTML,
  },
};