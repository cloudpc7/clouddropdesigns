import { Link } from 'react-router-dom';
import StudioWebsiteLayout from '../components/studio/StudioWebsiteLayout';
import '../styles/pages/_notFound.scss';

const NotFoundPage = () => (
  <StudioWebsiteLayout activeId="home" className="not-found-page">
    <section className="studio-website__panel not-found-page__panel" aria-labelledby="not-found-heading">
      <p className="not-found-page__eyebrow">404</p>
      <h1 id="not-found-heading" className="not-found-page__title">
        Page not found
      </h1>
      <p className="not-found-page__copy">
        That URL does not match a page on CloudDropDesigns. Try the studio portal, portfolio, or site
        map.
      </p>
      <div className="not-found-page__actions">
        <Link to="/" className="not-found-page__link">
          Back to home
        </Link>
        <Link to="/sitemap" className="not-found-page__link not-found-page__link--secondary">
          View site map
        </Link>
      </div>
    </section>
  </StudioWebsiteLayout>
);

export default NotFoundPage;