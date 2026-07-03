import { GET_PROFESSIONAL_PROFILE } from '../content/getProfessionalContent';
import { resolveAssetUrl } from './resolveAssetUrl';

const DEFAULT_SITE_URL = 'https://clouddropdesigns.com';
const DEFAULT_SITE_NAME = 'CloudDropDesigns';

export const getSeoForPath = (pathname, siteSeo, siteConfig) => {
  const siteUrl = siteConfig?.siteUrl ?? DEFAULT_SITE_URL;
  const defaultImage = `${siteUrl}/favicon.png`;
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

export const resolveSkilledTool = (tool) => ({
  ...tool,
  icon: resolveAssetUrl(tool.icon),
});

export const resolveGetProfessionalProfile = (profile) =>
  profile
    ? {
        ...profile,
        photo: resolveAssetUrl(profile.photo),
        trustBio: profile.trustBio ?? GET_PROFESSIONAL_PROFILE.trustBio,
      }
    : null;