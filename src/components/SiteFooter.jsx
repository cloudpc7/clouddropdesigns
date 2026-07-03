import { Link } from 'react-router-dom';
import { useSiteFooter, useSiteName, useSiteTagline } from '../hooks/useContent';
import '../styles/layout/_siteFooter.scss';

const FooterLinkList = ({ links, external = false }) => (
  <ul className="site-footer-wide__list">
    {links.map((link) => {
      const isExternal = external || link.external;
      const itemClassName = [
        'site-footer-wide__item',
        link.comingSoon ? 'site-footer-wide__item--soon' : '',
      ]
        .filter(Boolean)
        .join(' ');

      if (isExternal) {
        return (
          <li key={link.id} className={itemClassName}>
            <a
              href={link.path ?? link.href}
              className="site-footer-wide__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
              <span className="site-footer-wide__sr-note"> (opens in new tab)</span>
            </a>
          </li>
        );
      }

      return (
        <li key={link.id} className={itemClassName}>
          <Link to={link.path} className="site-footer-wide__link">
            {link.label}
            {link.comingSoon ? <span className="site-footer-wide__badge">In progress</span> : null}
          </Link>
        </li>
      );
    })}
  </ul>
);

const SiteFooter = () => {
  const siteName = useSiteName();
  const siteTagline = useSiteTagline();
  const { studioLinks, serviceLinks, productLinks, socialLinks } = useSiteFooter();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer-wide" role="contentinfo">
      <div className="site-footer-wide__inner">
        <div className="site-footer-wide__brand">
          <Link to="/" className="site-footer-wide__logo">
            {siteName}
          </Link>
          <p className="site-footer-wide__tagline">{siteTagline}</p>
        </div>

        <div className="site-footer-wide__nav">
          <div className="site-footer-wide__sections">
            <nav className="site-footer-wide__column" aria-label="Studio pages">
              <h2 className="site-footer-wide__heading">Studio</h2>
              <FooterLinkList links={studioLinks} />
            </nav>

            <nav className="site-footer-wide__column" aria-label="Services">
              <h2 className="site-footer-wide__heading">Services</h2>
              <FooterLinkList links={serviceLinks} />
            </nav>

            <nav className="site-footer-wide__column" aria-label="Products">
              <h2 className="site-footer-wide__heading">Products</h2>
              <FooterLinkList links={productLinks} />
            </nav>
          </div>

          <nav className="site-footer-wide__connect" aria-label="Social media">
            <h2 className="site-footer-wide__heading">Connect</h2>
            <ul className="site-footer-wide__social-list">
              {socialLinks.map((link) => (
                <li key={link.id} className="site-footer-wide__social-item">
                  <a
                    href={link.href}
                    className="site-footer-wide__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (${link.handle})`}
                  >
                    <img
                      src={link.icon}
                      alt=""
                      className="site-footer-wide__social-icon"
                      width={20}
                      height={20}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="site-footer-wide__social-text">
                      <span className="site-footer-wide__social-label">{link.label}</span>
                      <span className="site-footer-wide__social-handle">{link.handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="site-footer-wide__bottom">
        <p className="site-footer-wide__legal">© {year} CloudDropDesigns LLC</p>
        <div className="site-footer-wide__bottom-links">
          <Link to="/sitemap" className="site-footer-wide__bottom-link">
            Site Map
          </Link>
          <span className="site-footer-wide__bottom-text">Privacy</span>
          <span className="site-footer-wide__bottom-text">Terms</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;