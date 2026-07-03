import { useState } from 'react';
import { Link } from 'react-router-dom';
import menuBars from '../assets/menu-bars.svg';
import '../styles/layout/_nav.scss';
import '../styles/components/_offCanvas.scss';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="site-nav">
        <button
          type="button"
          className="site-nav__toggle"
          aria-label="Open menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
        >
          <img src={menuBars} alt="" className="site-nav__icon" />
        </button>
      </header>

      <div
        className={`off-canvas${isOpen ? ' is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="off-canvas__backdrop"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
        />
        <nav className="off-canvas__panel" aria-label="Site">
          <button
            type="button"
            className="off-canvas__close"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <a href="mailto:cloud@clouddropdesigns.com" onClick={() => setIsOpen(false)}>
            Connect
          </a>
          <Link to="/vibenmed" onClick={() => setIsOpen(false)}>
            Explore
          </Link>
          <a href="#about" onClick={() => setIsOpen(false)}>
            About
          </a>
          <Link to="/vibenmed/privacy" onClick={() => setIsOpen(false)}>
            Legal
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;