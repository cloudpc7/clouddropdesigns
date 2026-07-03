import { useEffect } from 'react';
import { useOrganizationJsonLd, useSeoForPath, useSiteName } from './useContent';

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

const upsertJsonLd = (data) => {
  if (!data) return;

  const id = 'clouddrop-organization-jsonld';
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

export const usePageSeo = (pathname) => {
  const seo = useSeoForPath(pathname);
  const siteName = useSiteName();
  const organizationJsonLd = useOrganizationJsonLd();

  useEffect(() => {
    document.title = seo.title;

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', seo.canonical);
    upsertMeta('property', 'og:type', seo.type);
    upsertMeta('property', 'og:site_name', siteName);
    upsertMeta('property', 'og:image', seo.image);
    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertLink('canonical', seo.canonical);
    upsertJsonLd(organizationJsonLd);
  }, [pathname, seo, siteName, organizationJsonLd]);
};