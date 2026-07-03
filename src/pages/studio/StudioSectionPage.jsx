import { Link, useParams } from 'react-router-dom';
import { useStudioNavItemById } from '../../hooks/useContent';
import '../../styles/pages/_studioSection.scss';

const StudioSectionPage = () => {
  const { sectionId } = useParams();
  const section = useStudioNavItemById(sectionId);

  return (
    <div className="studio-section-page">
      <div className="studio-section-page__card">
        <p className="studio-section-page__eyebrow">Design &amp; Development Studio</p>
        <h1 className="studio-section-page__title">{section?.title ?? 'Studio'}</h1>
        <p className="studio-section-page__copy">Content coming soon.</p>
        <Link className="studio-section-page__back" to="/">
          Return to card
        </Link>
      </div>
    </div>
  );
};

export default StudioSectionPage;