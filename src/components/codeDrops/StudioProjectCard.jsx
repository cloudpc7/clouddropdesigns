import { Link } from 'react-router-dom';
import { getProjectShowcaseImage } from '../../utils/preloadCodeDropsImages';
import '../../styles/components/_studioProjectCard.scss';

const StudioProjectCard = ({ project, onNavigate }) => {
  const isComingSoon = project.comingSoon || project.inProgress;
  const isExternal = project.href?.startsWith('http');
  const showcaseImage = getProjectShowcaseImage(project);
  const CardWrapper = project.href && !isComingSoon ? (isExternal ? 'a' : Link) : 'article';
  const wrapperProps =
    project.href && !isComingSoon
      ? isExternal
        ? { href: project.href, target: '_blank', rel: 'noreferrer' }
        : { to: project.href, onClick: onNavigate }
      : {};

  return (
    <CardWrapper
      className={[
        'studio-project-card',
        isComingSoon ? 'studio-project-card--soon' : '',
        project.brandPresentation && !project.mobileImage ? 'studio-project-card--brand' : '',
        project.screenshotPresentation || (isComingSoon && !project.brandPresentation)
          ? 'studio-project-card--screenshot'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--project-accent': project.accent,
        '--project-image-position': project.imagePosition ?? 'top center',
      }}
      aria-label={
        project.href
          ? `View ${project.name} — ${project.tagline}`
          : `${project.name} — ${project.tagline}`
      }
      {...wrapperProps}
    >
      <div className="studio-project-card__thumb">
        <img
          src={showcaseImage}
          alt={`${project.name} — ${project.tagline}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="studio-project-card__body">
        <p className="studio-project-card__category">{project.category}</p>
        <p className="studio-project-card__name">{project.name}</p>
        <p className="studio-project-card__tagline">{project.tagline}</p>
      </div>
      {isComingSoon ? (
        <span className="studio-project-card__status">
          {project.inProgress ? 'In progress' : 'Coming soon'}
        </span>
      ) : (
        <span className="studio-project-card__cta" aria-hidden="true">
          →
        </span>
      )}
    </CardWrapper>
  );
};

export default StudioProjectCard;