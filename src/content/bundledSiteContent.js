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
import {
  SITE_CONTACT,
  SITE_NAME,
  SITE_SLOGAN,
  SITE_TAGLINE,
  SITE_URL,
} from './siteConfig';
import { FOOTER_SERVICE_LINKS, FOOTER_SOCIAL_LINKS, FOOTER_STUDIO_LINKS } from './siteFooterLinks';
import { SITE_MAP_SECTIONS } from './siteMapSections';
import { DEFAULT_SEO, ORGANIZATION_JSON_LD, PAGE_SEO } from './siteSeo';
import {
  SKILLED_MANTRA,
  SKILLED_NARRATIVE,
  SKILLED_PROOF_CTA,
  SKILLED_TOOL_GROUPS,
} from './skilledByDesignContent';
import { STUDIO_NAV_ITEMS } from './studioNav';
import { STUDIO_PAGE_META } from './studioPageMeta';
import { PRIVACY_POLICY_HTML, TERMS_BODY_HTML } from './vibenmedLegalContent';

export const BUNDLED_SITE_CONTENT = {
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
    pageSeo: Object.values(PAGE_SEO),
    organizationJsonLd: {
      context: ORGANIZATION_JSON_LD['@context'],
      type: ORGANIZATION_JSON_LD['@type'],
      name: ORGANIZATION_JSON_LD.name,
      url: ORGANIZATION_JSON_LD.url,
      email: ORGANIZATION_JSON_LD.email,
      address: {
        type: ORGANIZATION_JSON_LD.address['@type'],
        addressRegion: ORGANIZATION_JSON_LD.address.addressRegion,
        addressCountry: ORGANIZATION_JSON_LD.address.addressCountry,
      },
      sameAs: ORGANIZATION_JSON_LD.sameAs,
    },
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
  meta: {
    source: 'bundled',
    updatedAt: '2026-09-01T00:00:00.000Z',
  },
};
