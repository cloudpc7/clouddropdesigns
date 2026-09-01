import { createSelector } from '@reduxjs/toolkit';
import { CODE_DROPS_PROJECTS } from '../../content/codeDropsProjects';
import {
  SKILLED_MANTRA,
  SKILLED_NARRATIVE,
  SKILLED_PROOF_CTA,
  SKILLED_TOOL_GROUPS,
} from '../../content/skilledByDesignContent';
import { ORGANIZATION_JSON_LD } from '../../content/siteSeo';
import { STUDIO_NAV_ITEMS } from '../../content/studioNav';
import { STUDIO_PAGE_META } from '../../content/studioPageMeta';
import {
  FOOTER_SERVICE_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_STUDIO_LINKS,
} from '../../content/siteFooterLinks';
import { SITE_MAP_SECTIONS } from '../../content/siteMapSections';
import {
  DROP_ELEVATE_SERVICE_OPTIONS,
  DROP_ELEVATE_SERVICES,
  DROP_ELEVATE_TO_PROJECT_TYPE,
} from '../../content/dropElevateServices';
import {
  GET_PROFESSIONAL_EXPERTISE,
  GET_PROFESSIONAL_LINKS,
  GET_PROFESSIONAL_PROFILE,
  GET_PROFESSIONAL_WORKING_PRINCIPLES,
  PROJECT_INQUIRY_BUDGETS,
  PROJECT_INQUIRY_TIMELINES,
  PROJECT_INQUIRY_TYPES,
} from '../../content/getProfessionalContent';
import { PRIVACY_POLICY_HTML, TERMS_BODY_HTML } from '../../content/vibenmedLegalContent';
import {
  getSeoForPath,
  mergeCodeDropProject,
  resolveCodeDropProject,
  resolveGetProfessionalProfile,
  resolveSkilledTool,
  resolveSocialLink,
  toOrganizationJsonLd,
} from '../../utils/contentHelpers';

const selectContentState = (state) => state.content;

export const selectContentStatus = (state) => selectContentState(state).status;
export const selectContentError = (state) => selectContentState(state).error;
export const selectContentReady = (state) => selectContentState(state).status === 'succeeded';

const selectSections = (state) => selectContentState(state).sections;

export const selectSiteConfig = (state) => selectSections(state).siteConfig;
export const selectSiteName = (state) => selectSiteConfig(state)?.siteName ?? 'CloudDropDesigns';
export const selectSiteSlogan = (state) =>
  selectSiteConfig(state)?.slogan ?? 'Drop the Code & Elevate your Web';
export const selectSiteTagline = (state) =>
  selectSiteConfig(state)?.tagline ??
  'Crafted web and mobile experiences for businesses that care about quality.';
export const selectSiteContact = (state) =>
  selectSiteConfig(state)?.contact ?? {
    email: 'cloud@clouddropdesigns.com',
    location: 'California, United States',
  };

export const selectStudioNav = (state) => selectSections(state).studioNav;
export const selectStudioNavItems = (state) => selectStudioNav(state)?.items ?? STUDIO_NAV_ITEMS;

export const selectStudioNavItemById = (id) => (state) => {
  const items = selectStudioNavItems(state);
  return items.find((item) => item.id === id) ?? items[0] ?? null;
};

export const selectStudioPageMeta = (state) =>
  selectSections(state).studioPageMeta ?? STUDIO_PAGE_META;

export const selectCodeDropsProjects = createSelector(
  [(state) => selectSections(state).codeDrops?.projects],
  (projects) => {
    const apiById = new Map((projects ?? []).map((project) => [project.id, project]));

    return CODE_DROPS_PROJECTS.map((staticProject) =>
      resolveCodeDropProject(mergeCodeDropProject(staticProject, apiById.get(staticProject.id))),
    );
  },
);

export const selectDropElevate = (state) => selectSections(state).dropElevate ?? {};
export const selectDropElevateServices = (state) =>
  selectDropElevate(state).services ?? DROP_ELEVATE_SERVICES;
export const selectDropElevateServiceOptions = (state) =>
  selectDropElevate(state).serviceOptions ?? DROP_ELEVATE_SERVICE_OPTIONS;
export const selectDropElevateToProjectType = (state) =>
  selectDropElevate(state).toProjectType ?? DROP_ELEVATE_TO_PROJECT_TYPE;

export const selectGetProfessional = (state) => selectSections(state).getProfessional ?? {};
export const selectGetProfessionalExpertise = (state) =>
  selectGetProfessional(state).expertise ?? GET_PROFESSIONAL_EXPERTISE;
export const selectGetProfessionalWorkingPrinciples = (state) =>
  selectGetProfessional(state).workingPrinciples ?? GET_PROFESSIONAL_WORKING_PRINCIPLES;
export const selectGetProfessionalInquiryTypes = (state) =>
  selectGetProfessional(state).inquiryTypes ?? PROJECT_INQUIRY_TYPES;
export const selectGetProfessionalInquiryTimelines = (state) =>
  selectGetProfessional(state).inquiryTimelines ?? PROJECT_INQUIRY_TIMELINES;
export const selectGetProfessionalInquiryBudgets = (state) =>
  selectGetProfessional(state).inquiryBudgets ?? PROJECT_INQUIRY_BUDGETS;
export const selectGetProfessionalProfile = createSelector(
  [(state) => selectGetProfessional(state).profile],
  resolveGetProfessionalProfile,
);
export const selectGetProfessionalLinks = createSelector(
  [(state) => selectGetProfessional(state).links],
  (links) => (links ?? []).map(resolveSocialLink),
);

export const selectSkilledByDesign = (state) => selectSections(state).skilledByDesign ?? {};
export const selectSkilledMantra = (state) => selectSkilledByDesign(state).mantra ?? SKILLED_MANTRA;
export const selectSkilledNarrative = (state) =>
  selectSkilledByDesign(state).narrative ?? SKILLED_NARRATIVE;
export const selectSkilledProofCta = (state) => ({
  ...SKILLED_PROOF_CTA,
  ...(selectSkilledByDesign(state).proofCta ?? {}),
});
export const selectSkilledToolGroups = createSelector(
  [(state) => selectSkilledByDesign(state).toolGroups],
  (apiGroups) => {
    const apiById = new Map((apiGroups ?? []).map((group) => [group.id, group]));

    return SKILLED_TOOL_GROUPS.map((group) => {
      const apiGroup = apiById.get(group.id);
      const apiToolsById = new Map((apiGroup?.tools ?? []).map((tool) => [tool.id, tool]));

      return {
        ...group,
        label: apiGroup?.label ?? group.label,
        tools: group.tools.map((tool) =>
          resolveSkilledTool({ ...tool, ...apiToolsById.get(tool.id) }),
        ),
      };
    });
  },
);

export const selectSiteSeo = (state) => selectSections(state).siteSeo;
export const selectSeoForPath = (pathname) => (state) =>
  getSeoForPath(pathname, selectSiteSeo(state), selectSiteConfig(state));
export const selectOrganizationJsonLd = createSelector(
  [(state) => selectSiteSeo(state)?.organizationJsonLd],
  (organizationJsonLd) => toOrganizationJsonLd(organizationJsonLd) ?? ORGANIZATION_JSON_LD,
);

export const selectSiteFooter = (state) => selectSections(state).siteFooter ?? {};
export const selectFooterStudioLinks = (state) =>
  selectSiteFooter(state).studioLinks ?? FOOTER_STUDIO_LINKS;
export const selectFooterServiceLinks = (state) =>
  selectSiteFooter(state).serviceLinks ?? FOOTER_SERVICE_LINKS;
export const selectFooterProductLinks = createSelector(
  [selectCodeDropsProjects],
  (projects) =>
    projects.map((project) => ({
      id: project.id,
      label: project.name,
      path: project.href ?? '/studio/code-drops',
      external: Boolean(project.href?.startsWith('http')),
      comingSoon: Boolean(project.inProgress || project.comingSoon),
    })),
);
export const selectFooterSocialLinks = createSelector(
  [(state) => selectSiteFooter(state).socialLinks],
  (links) => (links ?? FOOTER_SOCIAL_LINKS).map(resolveSocialLink),
);

export const selectSiteMapSections = (state) =>
  selectSections(state).siteMap?.sections ?? SITE_MAP_SECTIONS;

export const selectVibenmedLegal = (state) => selectSections(state).vibenmedLegal ?? {};
export const selectPrivacyPolicyHtml = (state) =>
  selectVibenmedLegal(state).privacyPolicyHtml ?? PRIVACY_POLICY_HTML;
export const selectTermsBodyHtml = (state) =>
  selectVibenmedLegal(state).termsBodyHtml ?? TERMS_BODY_HTML;