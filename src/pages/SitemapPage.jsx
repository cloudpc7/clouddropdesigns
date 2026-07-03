import { Link } from 'react-router-dom';
import StudioWebsiteLayout from '../components/studio/StudioWebsiteLayout';
import { useFooterSocialLinks, useSiteMapSections } from '../hooks/useContent';
import '../styles/pages/_sitemap.scss';

const SitemapPage = () => {
  const siteMapSections = useSiteMapSections();
  const footerSocialLinks = useFooterSocialLinks();

  return (
    <StudioWebsiteLayout activeId="sitemap" className="sitemap-page">
      <section className="sitemap-page__intro studio-website__panel" aria-labelledby="sitemap-intro-heading">
        <h2 id="sitemap-intro-heading" className="sitemap-page__intro-title">
          Browse the site
        </h2>
        <p className="sitemap-page__intro-copy">
          A complete index of CloudDropDesigns pages, services, products, and legal resources. For
          search engines, an XML sitemap is also available at{' '}
          <a href="/sitemap.xml" className="sitemap-page__xml-link">
            /sitemap.xml
          </a>
          .
        </p>
      </section>

      <div className="sitemap-page__grid">
        {siteMapSections.map((section) => (
          <section
            key={section.id}
            className="sitemap-page__section studio-website__panel"
            aria-labelledby={`sitemap-${section.id}-heading`}
          >
            <h2 id={`sitemap-${section.id}-heading`} className="sitemap-page__section-title">
              {section.title}
            </h2>
            <ul className="sitemap-page__list">
              {section.links.map((link) => {
                const isExternal = link.external || link.path?.startsWith('http');

                return (
                  <li key={link.id} className="sitemap-page__item">
                    {isExternal ? (
                      <a
                        href={link.path}
                        className="sitemap-page__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                        <span className="sitemap-page__external-note"> (external)</span>
                      </a>
                    ) : (
                      <Link to={link.path} className="sitemap-page__link">
                        {link.label}
                        {link.comingSoon ? (
                          <span className="sitemap-page__badge">In progress</span>
                        ) : null}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section
          className="sitemap-page__section studio-website__panel"
          aria-labelledby="sitemap-social-heading"
        >
          <h2 id="sitemap-social-heading" className="sitemap-page__section-title">
            Social
          </h2>
          <ul className="sitemap-page__list">
            {footerSocialLinks.map((link) => (
              <li key={link.id} className="sitemap-page__item">
                <a
                  href={link.href}
                  className="sitemap-page__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} — {link.handle}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </StudioWebsiteLayout>
  );
};

export default SitemapPage;