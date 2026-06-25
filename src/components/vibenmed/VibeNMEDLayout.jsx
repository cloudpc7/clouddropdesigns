import { Link } from 'react-router-dom';
import icon from '../../assets/vibenmed/icon.png';
import '../../styles/components/_vibenmedLayout.scss';

const VibeNMEDLayout = ({ children }) => {
  return (
    <div className="vibenmed-site">
      <header className="vibenmed-header">
        <div className="vibenmed-header__inner">
          <Link to="/vibenmed" className="vibenmed-brand">
            <img src={icon} alt="" className="vibenmed-brand__icon" />
            <span className="vibenmed-brand__name">VibeNMED</span>
          </Link>

          <nav className="vibenmed-nav" aria-label="Primary">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <Link to="/vibenmed/privacy">Privacy Policy</Link>
            <Link to="/vibenmed/terms">Terms of Service</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="vibenmed-footer">
        <div className="vibenmed-footer__inner">
          <div className="vibenmed-footer__brand">
            <img src={icon} alt="" />
            <div>
              <strong>VibeNMED</strong>
              <p>Healthcare networking, built for trust.</p>
            </div>
          </div>

          <div className="vibenmed-footer__links">
            <Link to="/vibenmed/privacy">Privacy Policy</Link>
            <Link to="/vibenmed/terms">Terms of Service</Link>
            <a href="mailto:cloud@clouddropdesigns.com">cloud@clouddropdesigns.com</a>
          </div>

          <p className="vibenmed-footer__legal">
            © {new Date().getFullYear()} Cloud Drop Designs LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VibeNMEDLayout;