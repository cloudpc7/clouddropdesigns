import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DropletThemeToggle from '../../components/DropletThemeToggle';
import ProjectDeckCard from '../../components/codeDrops/ProjectDeckCard';
import ProjectShowcaseTile from '../../components/codeDrops/ProjectShowcaseTile';
import StudioProjectCard from '../../components/codeDrops/StudioProjectCard';
import StudioWebsiteLayout from '../../components/studio/StudioWebsiteLayout';
import { useCodeDropsProjects } from '../../hooks/useContent';
import { useStudioPageScroll } from '../../hooks/useStudioPageScroll';
import { useTheme } from '../../context/ThemeContext';
import {
  preloadCodeDropsImages,
  preloadCodeDropsNeighbors,
} from '../../utils/preloadCodeDropsImages';
import '../../styles/pages/_codeDrops.scss';
import '../../styles/pages/_studioWideContent.scss';

const SWIPE_THRESHOLD = 40;
const MOBILE_QUERY = '(max-width: 767px)';

const CodeDropsPage = ({ embed = false }) => {
  const codeDropsProjects = useCodeDropsProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();
  useStudioPageScroll(theme, embed);
  const total = codeDropsProjects.length;
  const touchStart = useRef({ x: 0, y: 0 });

  const selectCard = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const cycleDeck = useCallback(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + total) % total);
  }, [total]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  useEffect(() => {
    if (embed) return;
    preloadCodeDropsImages(codeDropsProjects);
  }, [embed, codeDropsProjects]);

  useEffect(() => {
    if (embed) return undefined;
    const media = window.matchMedia(MOBILE_QUERY);
    if (!media.matches) return undefined;

    preloadCodeDropsNeighbors(activeIndex, codeDropsProjects);
    return undefined;
  }, [activeIndex, embed, codeDropsProjects]);

  useEffect(() => {
    if (embed) return undefined;
    const media = window.matchMedia(MOBILE_QUERY);
    const pageBg = theme === 'light' ? '#ebe8e2' : '#141414';
    const { style: htmlStyle } = document.documentElement;
    const { style: bodyStyle } = document.body;
    const root = document.getElementById('root');

    const applyScrollLock = () => {
      const shouldLock = media.matches;

      htmlStyle.overflow = shouldLock ? 'hidden' : '';
      htmlStyle.height = shouldLock ? '100%' : '';
      htmlStyle.overscrollBehavior = shouldLock ? 'none' : '';

      bodyStyle.overflow = shouldLock ? 'hidden' : '';
      bodyStyle.height = shouldLock ? '100%' : '';
      bodyStyle.width = shouldLock ? '100%' : '';
      bodyStyle.position = shouldLock ? 'fixed' : '';
      bodyStyle.top = shouldLock ? '0' : '';
      bodyStyle.left = shouldLock ? '0' : '';
      bodyStyle.overscrollBehavior = shouldLock ? 'none' : '';
      bodyStyle.backgroundColor = shouldLock ? pageBg : '';

      if (root) {
        root.style.height = shouldLock ? '100%' : '';
        root.style.overflow = shouldLock ? 'hidden' : '';
        root.style.overscrollBehavior = shouldLock ? 'none' : '';
      }
    };

    applyScrollLock();
    media.addEventListener('change', applyScrollLock);

    const handleKeyDown = (event) => {
      if (!media.matches) return;

      if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      media.removeEventListener('change', applyScrollLock);
      window.removeEventListener('keydown', handleKeyDown);

      htmlStyle.overflow = '';
      htmlStyle.height = '';
      htmlStyle.overscrollBehavior = '';

      bodyStyle.overflow = '';
      bodyStyle.height = '';
      bodyStyle.width = '';
      bodyStyle.position = '';
      bodyStyle.top = '';
      bodyStyle.left = '';
      bodyStyle.overscrollBehavior = '';
      bodyStyle.backgroundColor = '';

      if (root) {
        root.style.height = '';
        root.style.overflow = '';
        root.style.overscrollBehavior = '';
      }
    };
  }, [theme, goToNext, goToPrevious, embed]);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      goToNext();
    } else {
      goToPrevious();
    }
  };

  if (embed) {
    const liveCount = codeDropsProjects.filter(
      (project) => !project.inProgress && !project.comingSoon
    ).length;

    return (
      <div className="cd-embed">
        <p className="cd-embed__lead">
          <span className="cd-embed__count">
            {liveCount} live · {codeDropsProjects.length} total
          </span>
          Shipped builds and work in progress. Select a project to open it.
        </p>

        <ul className="cd-embed__list">
          {codeDropsProjects.map((project) => (
            <li key={project.id} className="cd-embed__item">
              <StudioProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className="studio-mobile-only code-drops-page code-drops-page--mobile">
        <DropletThemeToggle className="code-drops-page__theme-toggle" compact />

        <header className="code-drops-page__header">
          <p className="code-drops-page__eyebrow">Design &amp; Development Studio</p>
          <h1 className="code-drops-page__title">Code Drops</h1>
        </header>

        <div className="code-drops-page__stage">
          <div
            className="code-drops-page__deck"
            aria-label="Project portfolio deck"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {codeDropsProjects.map((project, index) => (
              <ProjectDeckCard
                key={project.id}
                project={project}
                index={index}
                total={total}
                activeIndex={activeIndex}
                onActivate={() => selectCard(index)}
                onCycle={cycleDeck}
              />
            ))}
          </div>
        </div>

        <footer className="code-drops-page__footer">
          <p className="code-drops-page__hint">Swipe or tap the card to browse</p>
          <Link className="code-drops-page__back" to="/">
            Return to card
          </Link>
        </footer>
      </div>

      <div className="studio-wide-only">
        <StudioWebsiteLayout activeId="code-drops" className="cd-wide">
          <section aria-labelledby="cd-portfolio-heading">
            <div className="studio-website__section-head">
              <h2 id="cd-portfolio-heading" className="studio-website__section-title">
                Portfolio
              </h2>
              <span className="studio-website__section-rule" aria-hidden="true" />
            </div>

            <div className="cd-wide__grid">
              {codeDropsProjects.map((project) => (
                <ProjectShowcaseTile key={project.id} project={project} />
              ))}
            </div>
          </section>
        </StudioWebsiteLayout>
      </div>
    </>
  );
};

export default CodeDropsPage;