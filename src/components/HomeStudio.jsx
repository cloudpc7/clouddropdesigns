import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCodeDropsProjects, useStudioNavItems } from '../hooks/useContent';
import { preloadCodeDropsImages } from '../utils/preloadCodeDropsImages';
import FlipPrompt from './FlipPrompt';
import '../styles/pages/_homeStudio.scss';

const stopFlip = (event) => {
  event.stopPropagation();
};

const HomeStudio = ({ variant = 'desktop' }) => {
  const studioNavItems = useStudioNavItems();
  const codeDropsProjects = useCodeDropsProjects();
  const isBack = variant === 'back';

  useEffect(() => {
    if (!isBack) return undefined;

    const schedule =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (callback) => window.setTimeout(callback, 200);

    const idleId = schedule(() => {
      preloadCodeDropsImages(codeDropsProjects);
    });

    return () => {
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, [isBack, codeDropsProjects]);

  if (isBack) {
    return (
      <aside
        className="home-studio home-studio--back"
        aria-label="CloudDropDesigns studio navigation"
      >
        <div className="home-studio__back-top">
          <h2 className="home-studio__back-title">Design &amp; Development Studio</h2>

          <nav className="home-studio__nav" aria-label="Studio sections">
            <div className="home-studio__nav-rule" aria-hidden="true" />
            <ul className="home-studio__nav-list">
              {studioNavItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="home-studio__nav-link"
                    onClick={stopFlip}
                    onMouseEnter={
                      item.id === 'code-drops' ? () => preloadCodeDropsImages(codeDropsProjects) : undefined
                    }
                    onFocus={
                      item.id === 'code-drops' ? () => preloadCodeDropsImages(codeDropsProjects) : undefined
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="home-studio__nav-rule" aria-hidden="true" />
          </nav>
        </div>

        <FlipPrompt label="Return" />
      </aside>
    );
  }

  return (
    <aside
      className="home-studio home-studio--desktop"
      aria-label="About CloudDropDesigns"
    >
      <p className="home-studio__eyebrow">Design &amp; Development Studio</p>
      <h2 className="home-studio__headline">
        We craft digital experiences that feel as considered as print.
      </h2>
      <p className="home-studio__copy">
        CloudDropDesigns LLC builds polished web and mobile products for teams who
        care about clarity, craft, and long-term quality.
      </p>

      <div className="home-studio__section">
        <h3 className="home-studio__label">Capabilities</h3>
        <ul className="home-studio__list">
          <li>Web applications &amp; marketing sites</li>
          <li>Mobile app design &amp; development</li>
          <li>Brand identity &amp; product UI</li>
        </ul>
      </div>

      <div className="home-studio__section">
        <h3 className="home-studio__label">Featured work</h3>
        <Link to="/vibenmed" className="home-studio__featured">
          <span className="home-studio__featured-name">VibeNMED</span>
          <span className="home-studio__featured-desc">
            Healthcare networking for students, preceptors, and educators
          </span>
        </Link>
      </div>

      <div className="home-studio__meta">
        <span>California, United States</span>
        <a href="mailto:cloud@clouddropdesigns.com">cloud@clouddropdesigns.com</a>
      </div>
    </aside>
  );
};

export default HomeStudio;