import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjectDeckImage, isImagePreloaded } from '../../utils/preloadCodeDropsImages';
import '../../styles/components/_projectDeckCard.scss';

const getStackPose = (index, activeIndex, total) => {
  if (index === activeIndex) {
    return { rotate: 0, offsetX: 0, offsetY: 0, scale: 1 };
  }

  const depth = (index - activeIndex + total) % total;

  return {
    rotate: depth % 2 === 1 ? -0.75 : 0.75,
    offsetX: depth % 2 === 1 ? -2 : 2,
    offsetY: depth * 3.5,
    scale: 1,
  };
};

const getStackZIndex = (index, activeIndex, total) => {
  if (index === activeIndex) return 30;
  const depth = (index - activeIndex + total) % total;
  return total - depth + 1;
};

const getDeckDistance = (index, activeIndex, total) => {
  const forward = (index - activeIndex + total) % total;
  const backward = (activeIndex - index + total) % total;
  return Math.min(forward, backward);
};

const ProjectDeckCard = ({ project, index, total, activeIndex, onActivate, onCycle }) => {
  const isActive = index === activeIndex;
  const deckDistance = getDeckDistance(index, activeIndex, total);
  const shouldLoadImage = deckDistance <= 1;
  const pose = getStackPose(index, activeIndex, total);
  const isExternal = project.href?.startsWith('http');
  const deckImage = getProjectDeckImage(project);
  const placeholder = project.thumb && project.thumb !== deckImage ? project.thumb : null;
  const imageRef = useRef(null);
  const [imageReady, setImageReady] = useState(() => isImagePreloaded(deckImage));

  useEffect(() => {
    if (!shouldLoadImage) {
      setImageReady(false);
      return;
    }

    if (isImagePreloaded(deckImage) || imageRef.current?.complete) {
      setImageReady(true);
    }
  }, [deckImage, shouldLoadImage]);

  const handleCardClick = () => {
    if (!isActive) {
      onActivate?.();
      return;
    }
    onCycle?.();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      onActivate?.();
    }
  };

  const handleImageLoad = () => {
    setImageReady(true);
  };

  const renderCta = () => {
    if (project.comingSoon || project.inProgress) {
      return (
        <span className="project-deck-card__status">
          {project.statusLabel ?? (project.inProgress ? 'In progress' : 'Coming soon')}
        </span>
      );
    }

    if (isActive && project.href) {
      if (isExternal) {
        return (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="project-deck-card__cta project-deck-card__cta--link"
            onClick={(event) => event.stopPropagation()}
          >
            View project →
          </a>
        );
      }

      return (
        <Link
          to={project.href}
          className="project-deck-card__cta project-deck-card__cta--link"
          onClick={(event) => event.stopPropagation()}
        >
          View project →
        </Link>
      );
    }

    return (
      <span className="project-deck-card__cta">
        {isActive ? 'Tap to browse' : 'Tap to preview'}
      </span>
    );
  };

  return (
    <article
      className={[
        'project-deck-card',
        isActive ? 'project-deck-card--active' : '',
        project.comingSoon ? 'project-deck-card--soon' : '',
        project.inProgress ? 'project-deck-card--wip' : '',
        project.brandPresentation && !project.mobileImage ? 'project-deck-card--brand' : '',
        project.screenshotPresentation ? 'project-deck-card--screenshot' : '',
        imageReady ? 'project-deck-card--image-ready' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--deck-rotate': `${pose.rotate}deg`,
        '--deck-offset-x': `${pose.offsetX}px`,
        '--deck-offset-y': `${pose.offsetY}px`,
        '--deck-scale': pose.scale,
        '--project-accent': project.accent,
        '--project-image-backdrop': project.imageBackdrop ?? '#080a12',
        '--project-image-position': project.imagePosition ?? 'top center',
        '--project-image-placeholder': placeholder ? `url("${placeholder}")` : 'none',
        zIndex: getStackZIndex(index, activeIndex, total),
      }}
      aria-label={`${project.name} — ${project.tagline}`}
      aria-current={isActive ? 'true' : undefined}
      role="button"
      tabIndex={isActive ? 0 : -1}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
    >
      <div className="project-deck-card__case">
        <div className="project-deck-card__glass" aria-hidden="true">
          <span className="project-deck-card__glare" />
          <span className="project-deck-card__frame" />
        </div>

        <div className="project-deck-card__inner">
          <div className="project-deck-card__media">
            {shouldLoadImage ? (
              <img
                ref={imageRef}
                src={deckImage}
                alt={`${project.name} — ${project.tagline}`}
                loading={isActive ? 'eager' : 'lazy'}
                fetchPriority={isActive ? 'high' : 'low'}
                decoding="async"
                onLoad={handleImageLoad}
              />
            ) : null}
            {project.comingSoon ? (
              <span className="project-deck-card__sketch" aria-hidden="true" />
            ) : null}
            <div className="project-deck-card__overlay">
              <p className="project-deck-card__category">{project.category}</p>
              <h2 className="project-deck-card__name">{project.name}</h2>
              <p className="project-deck-card__tagline">{project.tagline}</p>
              {renderCta()}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectDeckCard;