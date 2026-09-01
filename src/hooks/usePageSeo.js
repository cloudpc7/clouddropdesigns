import { useEffect } from 'react';
import { useOrganizationJsonLd, useSeoForPath, useSiteName } from './useContent';
import { normalizePathname } from '../utils/pathUtils';
import { getDefaultOgImage, getPageJsonLd } from '../utils/seoJsonLd';

const upsertMeta = (attr, key, content) => {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attr}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  if (!href) return;

  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const upsertJsonLd = (id, data) => {
  if (!data) return;

  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const clearPageJsonLd = () => {
  document.querySelectorAll('script[data-seo-jsonld="page"]').forEach((element) => {
    element.remove();
  });
};

const upsertPageJsonLdBlocks = (blocks) => {
  clearPageJsonLd();

  blocks.forEach((block, index) => {
    const element = document.createElement('script');
    element.type = 'application/ld+json';
    element.id = `clouddrop-page-jsonld-${index}`;
    element.setAttribute('data-seo-jsonld', 'page');
    element.textContent = JSON.stringify(block);
    document.head.appendChild(element);
  });
};

export const usePageSeo = (pathname) => {
  const resolvedPath = pathname === '*' ? '*' : normalizePathname(pathname);
  const seo = useSeoForPath(resolvedPath);
  const siteName = useSiteName();
  const organizationJsonLd = useOrganizationJsonLd();
  const ogImage = seo.image || getDefaultOgImage();
  const robots = resolvedPath === '*' ? 'noindex, follow' : 'index, follow';

  useEffect(() => {
    document.title = seo.title;

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', robots);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', seo.canonical);
    upsertMeta('property', 'og:type', seo.type);
    upsertMeta('property', 'og:site_name', siteName);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', ogImage);
    if (resolvedPath !== '*') {
      upsertLink('canonical', seo.canonical);
    }
    upsertJsonLd('clouddrop-organization-jsonld', organizationJsonLd);
    upsertPageJsonLdBlocks(getPageJsonLd(resolvedPath));
  }, [resolvedPath, seo, siteName, organizationJsonLd, ogImage, robots]);
};