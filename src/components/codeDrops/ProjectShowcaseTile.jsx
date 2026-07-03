import { Link } from 'react-router-dom';
import { getProjectShowcaseImage } from '../../utils/preloadCodeDropsImages';
import '../../styles/components/_projectShowcaseTile.scss';

const ProjectShowcaseTile = ({ project }) => {
  const isExternal = project.href?.startsWith('http');
  const isComingSoon = project.comingSoon || project.inProgress;
  const showcaseImage = getProjectShowcaseImage(project);

  const content = (
    <>
      <div className="project-showcase-tile__media">
        <img src={showcaseImage} alt="" loading="lazy" decoding="async" />
        <span
          className="project-showcase-tile__accent"
          style={{ '--project-accent': project.accent }}
          aria-hidden="true"
        />
      </div>
      <div className="project-showcase-tile__body">
        <span className="project-showcase-tile__category">{project.category}</span>
        <h3 className="project-showcase-tile__name">{project.name}</h3>
        <p className="project-showcase-tile__tagline">{project.tagline}</p>
        <span className="project-showcase-tile__cta">
          {isComingSoon ? 'In progress' : 'View project'}
        </span>
      </div>
    </>
  );

  const accentStyle = { '--project-accent': project.accent };

  if (isComingSoon) {
    return (
      <article
        className="project-showcase-tile project-showcase-tile--soon"
        style={accentStyle}
      >
        {content}
      </article>
    );
  }

  if (isExternal) {
    return (
      <a
        href={project.href}
        className="project-showcase-tile"
        style={accentStyle}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={project.href} className="project-showcase-tile" style={accentStyle}>
      {content}
    </Link>
  );
};

export default ProjectShowcaseTile;