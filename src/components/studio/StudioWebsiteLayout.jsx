import { Link } from 'react-router-dom';
import DropletThemeToggle from '../DropletThemeToggle';
import SiteFooter from '../SiteFooter';
import { useSiteSlogan, useStudioNavItems, useStudioPageMeta } from '../../hooks/useContent';
import '../../styles/layout/_studioWebsite.scss';

const StudioWebsiteLayout = ({
  activeId,
  children,
  className = '',
  heroAside = null,
  heroLeftAddition = null,
  heroAction = null,
}) => {
  const studioPageMeta = useStudioPageMeta();
  const studioNavItems = useStudioNavItems();
  const siteSlogan = useSiteSlogan();
  const meta = studioPageMeta[activeId] ?? studioPageMeta['code-drops'];
  const heroClassName = heroAside
    ? 'studio-website__hero studio-website__hero--split'
    : 'studio-website__hero';

  return (
    <div className={`studio-website ${className}`.trim()}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="studio-website__header">
        <div className="studio-website__header-inner">
          <Link to="/" className="studio-website__brand">
            CloudDropDesigns
          </Link>

          <nav className="studio-website__nav" aria-label="Studio sections">
            <ul className="studio-website__nav-list">
              {studioNavItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`studio-website__nav-link${
                      item.id === activeId ? ' is-active' : ''
                    }`}
                    aria-current={item.id === activeId ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <DropletThemeToggle className="studio-website__theme-toggle" compact />
        </div>
      </header>

      <section className={heroClassName}>
        <div className="studio-website__hero-inner">
          {activeId === 'home' ? (
            <>
              <div className="studio-website__hero-left">
                {heroLeftAddition}
              </div>
              <div className="studio-website__hero-copy">
                <p className="studio-website__eyebrow">Design &amp; Development Studio</p>
                <h1 className="studio-website__title">{meta.title}</h1>
                <p className="studio-website__slogan">{siteSlogan}</p>
                {heroAction}
              </div>
            </>
          ) : (
            <>
              <div className="studio-website__hero-copy">
                <p className="studio-website__eyebrow">Design &amp; Development Studio</p>
                <h1 className="studio-website__title">{meta.title}</h1>
                <p className="studio-website__subtitle">{meta.subtitle}</p>
                {heroLeftAddition}
              </div>
              {heroAside ? <div className="studio-website__hero-aside">{heroAside}</div> : null}
            </>
          )}
        </div>
      </section>

      <main id="main-content" className="studio-website__main" tabIndex={-1}>
        {children}
      </main>

      <SiteFooter />
    </div>
  );
};

export default StudioWebsiteLayout;