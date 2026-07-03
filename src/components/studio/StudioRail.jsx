import { Link } from 'react-router-dom';
import { useStudioNavItems } from '../../hooks/useContent';
import '../../styles/components/_studioRail.scss';

const StudioRail = ({ activeId }) => {
  const studioNavItems = useStudioNavItems();
  const activeItem = studioNavItems.find((item) => item.id === activeId);

  return (
    <aside className="studio-rail" aria-label="Studio navigation">
      <div className="studio-rail__brand-block">
        <Link to="/" className="studio-rail__brand">
          CloudDropDesigns
        </Link>
        <p className="studio-rail__eyebrow">Design &amp; Development Studio</p>
      </div>

      {activeItem && (
        <div className="studio-rail__current">
          <span className="studio-rail__current-label">Now viewing</span>
          <p className="studio-rail__current-title">{activeItem.title}</p>
        </div>
      )}

      <nav className="studio-rail__nav" aria-label="Studio sections">
        <ul className="studio-rail__nav-list">
          {studioNavItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`studio-rail__nav-link${item.id === activeId ? ' is-active' : ''}`}
                aria-current={item.id === activeId ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link to="/" className="studio-rail__return">
        Return to card
      </Link>
    </aside>
  );
};

export default StudioRail;