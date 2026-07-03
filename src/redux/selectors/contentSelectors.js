import { createSelector } from '@reduxjs/toolkit';
import {
  getSeoForPath,
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
export const selectStudioNavItems = (state) => selectStudioNav(state)?.items ?? [];

export const selectStudioNavItemById = (id) => (state) => {
  const items = selectStudioNavItems(state);
  return items.find((item) => item.id === id) ?? items[0] ?? null;
};

export const selectStudioPageMeta = (state) => selectSections(state).studioPageMeta ?? {};

export const selectCodeDropsProjects = createSelector(
  [(state) => selectSections(state).codeDrops?.projects],
  (projects) => (projects ?? []).map(resolveCodeDropProject),
);

export const selectDropElevate = (state) => selectSections(state).dropElevate ?? {};
export const selectDropElevateServices = (state) => selectDropElevate(state).services ?? [];
export const selectDropElevateServiceOptions = (state) =>
  selectDropElevate(state).serviceOptions ?? [];
export const selectDropElevateToProjectType = (state) =>
  selectDropElevate(state).toProjectType ?? {};

export const selectGetProfessional = (state) => selectSections(state).getProfessional ?? {};
export const selectGetProfessionalExpertise = (state) =>
  selectGetProfessional(state).expertise ?? [];
export const selectGetProfessionalWorkingPrinciples = (state) =>
  selectGetProfessional(state).workingPrinciples ?? [];
export const selectGetProfessionalInquiryTypes = (state) =>
  selectGetProfessional(state).inquiryTypes ?? [];
export const selectGetProfessionalInquiryTimelines = (state) =>
  selectGetProfessional(state).inquiryTimelines ?? [];
export const selectGetProfessionalInquiryBudgets = (state) =>
  selectGetProfessional(state).inquiryBudgets ?? [];
export const selectGetProfessionalProfile = createSelector(
  [(state) => selectGetProfessional(state).profile],
  resolveGetProfessionalProfile,
);
export const selectGetProfessionalLinks = createSelector(
  [(state) => selectGetProfessional(state).links],
  (links) => (links ?? []).map(resolveSocialLink),
);

export const selectSkilledByDesign = (state) => selectSections(state).skilledByDesign ?? {};
export const selectSkilledMantra = (state) => selectSkilledByDesign(state).mantra ?? [];
export const selectSkilledToolGroups = createSelector(
  [(state) => selectSkilledByDesign(state).toolGroups],
  (groups) =>
    (groups ?? []).map((group) => ({
      ...group,
      tools: (group.tools ?? []).map(resolveSkilledTool),
    })),
);

export const selectSiteSeo = (state) => selectSections(state).siteSeo;
export const selectSeoForPath = (pathname) => (state) =>
  getSeoForPath(pathname, selectSiteSeo(state), selectSiteConfig(state));
export const selectOrganizationJsonLd = createSelector(
  [(state) => selectSiteSeo(state)?.organizationJsonLd],
  toOrganizationJsonLd,
);

export const selectSiteFooter = (state) => selectSections(state).siteFooter ?? {};
export const selectFooterStudioLinks = (state) => selectSiteFooter(state).studioLinks ?? [];
export const selectFooterServiceLinks = (state) => selectSiteFooter(state).serviceLinks ?? [];
export const selectFooterProductLinks = (state) => selectSiteFooter(state).productLinks ?? [];
export const selectFooterSocialLinks = createSelector(
  [(state) => selectSiteFooter(state).socialLinks],
  (links) => (links ?? []).map(resolveSocialLink),
);

export const selectSiteMapSections = (state) => selectSections(state).siteMap?.sections ?? [];

export const selectVibenmedLegal = (state) => selectSections(state).vibenmedLegal ?? {};
export const selectPrivacyPolicyHtml = (state) =>
  selectVibenmedLegal(state).privacyPolicyHtml ?? '';
export const selectTermsBodyHtml = (state) => selectVibenmedLegal(state).termsBodyHtml ?? '';