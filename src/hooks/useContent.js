import { useSelector } from 'react-redux';
import {
  selectCodeDropsProjects,
  selectContentError,
  selectContentReady,
  selectContentStatus,
  selectDropElevateServiceOptions,
  selectDropElevateServices,
  selectDropElevateToProjectType,
  selectFooterProductLinks,
  selectFooterServiceLinks,
  selectFooterSocialLinks,
  selectFooterStudioLinks,
  selectGetProfessionalExpertise,
  selectGetProfessionalInquiryBudgets,
  selectGetProfessionalInquiryTimelines,
  selectGetProfessionalInquiryTypes,
  selectGetProfessionalLinks,
  selectGetProfessionalProfile,
  selectGetProfessionalWorkingPrinciples,
  selectOrganizationJsonLd,
  selectPrivacyPolicyHtml,
  selectSeoForPath,
  selectSiteContact,
  selectSiteMapSections,
  selectSiteName,
  selectSiteSlogan,
  selectSiteTagline,
  selectSkilledMantra,
  selectSkilledToolGroups,
  selectStudioNavItemById,
  selectStudioNavItems,
  selectStudioPageMeta,
  selectTermsBodyHtml,
} from '../redux/selectors/contentSelectors';

export const useContentStatus = () => useSelector(selectContentStatus);
export const useContentError = () => useSelector(selectContentError);
export const useContentReady = () => useSelector(selectContentReady);

export const useSiteConfig = () => ({
  name: useSelector(selectSiteName),
  slogan: useSelector(selectSiteSlogan),
  tagline: useSelector(selectSiteTagline),
  contact: useSelector(selectSiteContact),
});

export const useSiteName = () => useSelector(selectSiteName);
export const useSiteSlogan = () => useSelector(selectSiteSlogan);
export const useSiteTagline = () => useSelector(selectSiteTagline);
export const useSiteContact = () => useSelector(selectSiteContact);

export const useStudioNavItems = () => useSelector(selectStudioNavItems);
export const useStudioNavItemById = (id) => useSelector(selectStudioNavItemById(id));
export const useStudioPageMeta = () => useSelector(selectStudioPageMeta);

export const useCodeDropsProjects = () => useSelector(selectCodeDropsProjects);

export const useDropElevate = () => ({
  services: useSelector(selectDropElevateServices),
  serviceOptions: useSelector(selectDropElevateServiceOptions),
  toProjectType: useSelector(selectDropElevateToProjectType),
});

export const useGetProfessional = () => ({
  expertise: useSelector(selectGetProfessionalExpertise),
  workingPrinciples: useSelector(selectGetProfessionalWorkingPrinciples),
  profile: useSelector(selectGetProfessionalProfile),
  links: useSelector(selectGetProfessionalLinks),
  inquiryTypes: useSelector(selectGetProfessionalInquiryTypes),
  inquiryTimelines: useSelector(selectGetProfessionalInquiryTimelines),
  inquiryBudgets: useSelector(selectGetProfessionalInquiryBudgets),
});

export const useSkilledByDesign = () => ({
  mantra: useSelector(selectSkilledMantra),
  toolGroups: useSelector(selectSkilledToolGroups),
});

export const useSiteFooter = () => ({
  studioLinks: useSelector(selectFooterStudioLinks),
  serviceLinks: useSelector(selectFooterServiceLinks),
  productLinks: useSelector(selectFooterProductLinks),
  socialLinks: useSelector(selectFooterSocialLinks),
});

export const useSiteMapSections = () => useSelector(selectSiteMapSections);
export const useFooterSocialLinks = () => useSelector(selectFooterSocialLinks);

export const useSeoForPath = (pathname) => useSelector(selectSeoForPath(pathname));
export const useOrganizationJsonLd = () => useSelector(selectOrganizationJsonLd);

export const useVibenmedLegal = () => ({
  privacyPolicyHtml: useSelector(selectPrivacyPolicyHtml),
  termsBodyHtml: useSelector(selectTermsBodyHtml),
});