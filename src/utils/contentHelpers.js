import { GET_PROFESSIONAL_PROFILE } from '../content/getProfessionalContent';
import { SKILLED_TOOL_GROUPS } from '../content/skilledByDesignContent';
import { resolveAssetUrl } from './resolveAssetUrl';

const SKILLED_TOOLS_BY_ID = new Map(
  SKILLED_TOOL_GROUPS.flatMap((group) => group.tools.map((tool) => [tool.id, tool])),
);

const DEFAULT_SITE_URL = 'https://clouddropdesigns.com';
const DEFAULT_SITE_NAME = 'CloudDropDesigns';

export const getSeoForPath = (pathname, siteSeo, siteConfig) => {
  const siteUrl = siteConfig?.siteUrl ?? DEFAULT_SITE_URL;
  const defaultImage = `${siteUrl}/og-image.png`;
  const defaultSeo = {
    ...(siteSeo?.defaultSeo ?? {}),
    title: siteSeo?.defaultSeo?.title ?? `${DEFAULT_SITE_NAME} — Design & Development Studio`,
    description: siteSeo?.defaultSeo?.description ?? siteConfig?.tagline ?? '',
    path: '/',
    image: siteSeo?.defaultSeo?.image ?? defaultImage,
    type: siteSeo?.defaultSeo?.type ?? 'website',
  };

  const pageMeta = (siteSeo?.pageSeo ?? []).find((entry) => entry.path === pathname);
  const meta = pageMeta ?? defaultSeo;

  return {
    ...defaultSeo,
    ...meta,
    canonical: `${siteUrl}${meta.path ?? pathname}`,
  };
};

export const toOrganizationJsonLd = (organizationJsonLd) => {
  if (!organizationJsonLd) {
    return null;
  }

  const { context, type, address, ...rest } = organizationJsonLd;

  return {
    '@context': context ?? 'https://schema.org',
    '@type': type ?? 'Organization',
    ...rest,
    ...(address
      ? {
          address: {
            '@type': address.type ?? 'PostalAddress',
            ...Object.fromEntries(
              Object.entries(address).filter(([key]) => key !== 'type'),
            ),
          },
        }
      : {}),
  };
};

export const mergeCodeDropProject = (staticProject, apiProject = {}) => {
  const href = staticProject.href ?? apiProject.href ?? null;
  const hasLaunchHref = Boolean(href);
  const inProgress =
    staticProject.inProgress ??
    (hasLaunchHref ? false : apiProject.inProgress ?? false);
  const comingSoon =
    staticProject.comingSoon ??
    (hasLaunchHref ? false : apiProject.comingSoon ?? false);

  return {
    ...apiProject,
    ...staticProject,
    href,
    inProgress,
    comingSoon,
    image: staticProject.image,
    thumb: staticProject.thumb,
    mobileImage: staticProject.mobileImage ?? apiProject.mobileImage,
  };
};

export const resolveCodeDropProject = (project) => ({
  ...project,
  image: resolveAssetUrl(project.image),
  thumb: resolveAssetUrl(project.thumb),
  mobileImage: project.mobileImage ? resolveAssetUrl(project.mobileImage) : undefined,
});

export const resolveSocialLink = (link) => ({
  ...link,
  icon: resolveAssetUrl(link.icon),
});

export const resolveSkilledTool = (tool) => {
  const fallback = SKILLED_TOOLS_BY_ID.get(tool.id);

  return {
    ...fallback,
    ...tool,
    icon: resolveAssetUrl(tool.icon ?? fallback?.icon),
    href: tool.href ?? fallback?.href,
  };
};

export const resolveGetProfessionalProfile = (profile) => {
  const source = profile ?? GET_PROFESSIONAL_PROFILE;

  return {
    ...GET_PROFESSIONAL_PROFILE,
    ...source,
    photo: resolveAssetUrl(source.photo ?? GET_PROFESSIONAL_PROFILE.photo),
    trustBio: source.trustBio ?? GET_PROFESSIONAL_PROFILE.trustBio,
  };
};