import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, useTransition, animated, easings } from '@react-spring/web';
import BusinessCardShell from '../components/BusinessCardShell';
import DropletThemeToggle from '../components/DropletThemeToggle';
import FlipPrompt from '../components/FlipPrompt';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HomeStudio from '../components/HomeStudio';
import StudioWebsiteLayout from '../components/studio/StudioWebsiteLayout';
import ProjectShowcaseTile from '../components/codeDrops/ProjectShowcaseTile';
import HeroCloudAddition from '../components/HeroCloudAddition';
import { useCodeDropsProjects } from '../hooks/useContent';
import { useTheme } from '../context/ThemeContext';
import '../styles/pages/_home.scss';
import CodeDropsPage from './studio/CodeDropsPage';
import DropAndElevatePage from './studio/DropAndElevatePage';
import GetProfessionalPage from './studio/GetProfessionalPage';
import SkilledByDesignPage from './studio/SkilledByDesignPage';

const PORTAL_SECTIONS = [
  {
    id: 'code-drops',
    label: 'Code Drops',
    path: '/studio/code-drops',
    desc: 'Explore our curated collection of live software applications, responsive web products, and creative systems.',
    action: 'Explore Portfolio →',
    stat: '4 Live Drops',
  },
  {
    id: 'drop-and-elevate',
    label: 'Drop & Elevate',
    path: '/studio/drop-and-elevate',
    desc: 'Premium custom design, development, and cloud integration services. Select your solution and get started.',
    action: 'Inquire Now →',
    stat: 'Full Services',
  },
  {
    id: 'get-professional',
    label: 'Get Professional',
    path: '/studio/get-professional',
    desc: '10+ years of specialized systems, security, and developer experience. Meet the founder.',
    action: 'View Profile →',
    stat: '10+ Yrs Exp',
  },
  {
    id: 'skilled-by-design',
    label: 'Skilled By Design',
    path: '/studio/skilled-by-design',
    desc: 'A deep-dive into our core technologies, developer toolkit, cloud architecture, and styling philosophy.',
    action: 'See Toolkit →',
    stat: 'Our Stack',
  },
];

const PortalListCard = ({ sections, onSelectOption, activeId }) => {
  return (
    <div className="portal-list-card">
      <span className="portal-list-card__corner portal-list-card__corner--tl" aria-hidden="true" />
      <span className="portal-list-card__corner portal-list-card__corner--tr" aria-hidden="true" />
      <span className="portal-list-card__corner portal-list-card__corner--bl" aria-hidden="true" />
      <span className="portal-list-card__corner portal-list-card__corner--br" aria-hidden="true" />

      <div className="portal-list-card__inner">
        <div className="portal-list-card__texture" />
        <div className="portal-list-card__frame">
          <div className="portal-list-card__options">
            {sections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <div
                  key={section.id}
                  className={`portal-list-option ${isActive ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectOption(section.id);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectOption(section.id);
                    }
                  }}
                  aria-label={`Open ${section.label}`}
                >
                  <span
                    className="portal-list-option__corner portal-list-option__corner--tl"
                    aria-hidden="true"
                  />
                  <span
                    className="portal-list-option__corner portal-list-option__corner--br"
                    aria-hidden="true"
                  />
                  <div className="portal-list-option__indicator" />
                  
                  <div className="portal-list-option__main">
                    <h4 className="portal-list-option__label">{section.label}</h4>
                    <p className="portal-list-option__desc">{section.desc}</p>
                  </div>
                  
                  <div className="portal-list-option__action">
                    <Link
                      to={section.path}
                      className="portal-list-option__cta"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {section.action}
                    </Link>
                    <span className="portal-list-option__arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const OFFCANVAS_EASE = easings.easeOutCubic;
const OFFCANVAS_DURATION = 420;

const HomePage = () => {
  const codeDropsProjects = useCodeDropsProjects();
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeDetailId, setActiveDetailId] = useState(null);
  const [isTabletOffcanvas, setIsTabletOffcanvas] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');

    const lockScroll = () => {
      const shouldLock = media.matches;
      document.documentElement.style.overflow = shouldLock ? 'hidden' : '';
      document.body.style.overflow = shouldLock ? 'hidden' : '';
      document.body.style.backgroundColor = shouldLock
        ? theme === 'light'
          ? '#f0eeea'
          : '#141414'
        : '';
    };

    lockScroll();
    media.addEventListener('change', lockScroll);

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.backgroundColor = '';
    };
  }, [theme]);

  useEffect(() => {
    const tabletMedia = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');

    const lockTabletDrawerScroll = () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      if (activeDetailId && tabletMedia.matches) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        return;
      }
      if (!isMobile) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    };

    lockTabletDrawerScroll();
    tabletMedia.addEventListener('change', lockTabletDrawerScroll);

    return () => {
      tabletMedia.removeEventListener('change', lockTabletDrawerScroll);
      if (!window.matchMedia('(max-width: 767px)').matches) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    };
  }, [activeDetailId]);

  useEffect(() => {
    const tabletMedia = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const updateTabletMode = () => setIsTabletOffcanvas(tabletMedia.matches);

    updateTabletMode();
    tabletMedia.addEventListener('change', updateTabletMode);

    return () => tabletMedia.removeEventListener('change', updateTabletMode);
  }, []);

  const handleFlip = () => {
    if (window.innerWidth >= 768) return;
    setIsFlipped((current) => !current);
  };

  const handleNextSection = (event) => {
    event.stopPropagation();
    if (!activeDetailId) return;
    const currentIndex = PORTAL_SECTIONS.findIndex((s) => s.id === activeDetailId);
    const nextIndex = (currentIndex + 1) % PORTAL_SECTIONS.length;
    setActiveDetailId(PORTAL_SECTIONS[nextIndex].id);
  };

  // Only display the 3 primary projects on the homepage showcase
  const featuredProjects = codeDropsProjects.slice(0, 3);

  // React Spring Animations for sliding offcanvas and detail card
  const currentDetailSection = useMemo(
    () => PORTAL_SECTIONS.find((s) => s.id === activeDetailId),
    [activeDetailId]
  );

  const cardTransitions = useTransition(currentDetailSection, {
    key: (item) => item?.id,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 280, easing: OFFCANVAS_EASE },
    exitBeforeEnter: false,
  });

  const backdropSpring = useSpring({
    opacity: activeDetailId ? 1 : 0,
    pointerEvents: activeDetailId ? 'auto' : 'none',
    config: { duration: OFFCANVAS_DURATION, easing: OFFCANVAS_EASE },
  });

  const panelSpring = useSpring({
    transform: activeDetailId
      ? isTabletOffcanvas
        ? 'translate3d(0, 0%, 0)'
        : 'translate3d(0%, 0, 0)'
      : isTabletOffcanvas
        ? 'translate3d(0, -100%, 0)'
        : 'translate3d(100%, 0, 0)',
    config: { duration: OFFCANVAS_DURATION, easing: OFFCANVAS_EASE },
  });

  return (
    <div className="home-page-container">
      {/* 1. MOBILE VIEW (Flippable business card) */}
      <div className="studio-mobile-only home-page">
        <DropletThemeToggle className="home-page__theme-toggle" compact />
        <HomeStudio variant="desktop" />

        <div className="card-flip-edge" aria-hidden="true" />

        <div
          className={`card-flip${isFlipped ? ' is-flipped' : ''}`}
          onClick={handleFlip}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleFlip();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={isFlipped ? 'Flip to front of business card' : 'Flip to studio details'}
        >
          <div className="card-flip__inner">
            <div className="card-flip__face card-flip__face--front">
              <BusinessCardShell>
                <div className="business-card__body business-card__body--front">
                  <Hero />
                  <FlipPrompt label="View studio" />
                  <Footer />
                </div>
              </BusinessCardShell>
            </div>

            <div className="card-flip__face card-flip__face--back">
              <BusinessCardShell>
                <div className="business-card__body business-card__body--back">
                  <HomeStudio variant="back" />
                </div>
              </BusinessCardShell>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TABLET/DESKTOP VIEW (Premium responsive agency portal) */}
      <div className="studio-wide-only">
        <StudioWebsiteLayout
          activeId="home"
          className="home-wide"
          heroAside={null}
          heroLeftAddition={<HeroCloudAddition />}
          heroAction={
            <div className="home-wide__cta-banner home-wide__cta-banner--hero">
              <Link to="/studio/drop-and-elevate" className="home-wide__cta-button">
                Start a project with us
              </Link>
            </div>
          }
        >
          <div className="home-wide__hub">
            <section
              className="studio-website__section home-wide__portal-section"
              aria-labelledby="home-portal-heading"
            >
              <div className="studio-website__section-head">
                <h2 id="home-portal-heading" className="studio-website__section-title">
                  Studio Portal
                </h2>
                <span className="studio-website__section-rule" aria-hidden="true" />
              </div>

              <div className="home-portal__list-container">
                <PortalListCard
                  sections={PORTAL_SECTIONS}
                  onSelectOption={(id) => setActiveDetailId(id)}
                  activeId={activeDetailId}
                />
              </div>
            </section>

            <section
              className="studio-website__section home-wide__portfolio-section"
              aria-labelledby="home-portfolio-heading"
            >
              <div className="studio-website__section-head">
                <h2 id="home-portfolio-heading" className="studio-website__section-title">
                  Featured Work
                </h2>
                <span className="studio-website__section-rule" aria-hidden="true" />
              </div>

              <div className="home-portfolio__grid">
                {featuredProjects.map((project) => (
                  <div key={project.id} className="home-portfolio__item">
                    <ProjectShowcaseTile project={project} />
                  </div>
                ))}
              </div>
            </section>

            <div className="home-wide__cta-banner home-wide__cta-banner--main">
              <Link to="/studio/drop-and-elevate" className="home-wide__cta-button">
                Start a project with us
              </Link>
            </div>
          </div>
        </StudioWebsiteLayout>
      </div>

      {/* 3. SLIDING OFF-CANVAS DETAIL PANEL */}
      <div
        className={`portal-offcanvas${activeDetailId ? ' is-open' : ''}${isTabletOffcanvas ? ' portal-offcanvas--tablet' : ''}${activeDetailId === 'drop-and-elevate' ? ' portal-offcanvas--compact' : ''}`}
        style={{
          pointerEvents: activeDetailId ? 'auto' : 'none',
        }}
      >
        <animated.div
          className="portal-offcanvas__backdrop"
          style={backdropSpring}
          onClick={() => setActiveDetailId(null)}
        />
        <animated.div
          className="portal-offcanvas__panel"
          style={panelSpring}
          data-theme={theme}
        >
          <button
            type="button"
            className="portal-offcanvas__close"
            onClick={() => setActiveDetailId(null)}
            aria-label="Back to home"
          >
            &times;
          </button>

          <div className="portal-offcanvas__container">
            {cardTransitions((style, item) => {
              if (!item) return null;

              let PageContent = null;
              if (item.id === 'code-drops') {
                PageContent = <CodeDropsPage embed={true} />;
              } else if (item.id === 'drop-and-elevate') {
                PageContent = <DropAndElevatePage embed={true} />;
              } else if (item.id === 'get-professional') {
                PageContent = <GetProfessionalPage embed={true} />;
              } else if (item.id === 'skilled-by-design') {
                PageContent = <SkilledByDesignPage embed={true} />;
              }

              return (
                <animated.div style={style} className="portal-offcanvas__transition-wrap">
                  <div className="portal-offcanvas__glass-screen">
                    <header className="portal-offcanvas__header-info">
                      <div className="portal-offcanvas__header-left">
                        <button
                          type="button"
                          className="portal-offcanvas__back-home"
                          onClick={() => setActiveDetailId(null)}
                        >
                          &larr; Back to home
                        </button>
                        <h2 className="portal-offcanvas__title">{item.label}</h2>
                      </div>
                      <div className="portal-offcanvas__header-right">
                        <Link
                          to={item.path}
                          className="portal-offcanvas__full-view-btn"
                          onClick={() => setActiveDetailId(null)}
                        >
                          Open Full Page &rarr;
                        </Link>
                      </div>
                    </header>

                    <div className="portal-offcanvas__scroll-area">
                      {PageContent}
                    </div>
                  </div>
                </animated.div>
              );
            })}
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default HomePage;