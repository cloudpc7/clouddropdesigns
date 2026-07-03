import { useTheme } from '../context/ThemeContext';
import '../styles/components/_dropletThemeToggle.scss';

const DropletThemeToggle = ({ className = '', compact = false }) => {
  const { toggleTheme, isDark } = useTheme();
  const nextMode = isDark ? 'light' : 'dark';

  const handleToggle = (event) => {
    event.stopPropagation();
    toggleTheme();
  };

  return (
    <div
      className={`droplet-theme-toggle-wrap${compact ? ' droplet-theme-toggle-wrap--compact' : ''} ${className}`.trim()}
    >
      {!compact ? (
        <p className="droplet-theme-toggle-wrap__title" id="theme-toggle-label">
          Theme
        </p>
      ) : null}

      <button
        type="button"
        className={`droplet-theme-toggle${isDark ? ' droplet-theme-toggle--dark' : ' droplet-theme-toggle--light'}`}
        role="switch"
        aria-checked={!isDark}
        aria-labelledby={compact ? undefined : 'theme-toggle-label'}
        aria-label={`${isDark ? 'Dark' : 'Light'} mode. Switch to ${nextMode} mode.`}
        onClick={handleToggle}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <span className="droplet-theme-toggle__droplet" aria-hidden="true">
          <svg viewBox="0 0 40 52" className="droplet-theme-toggle__shape">
            <path d="M20 2C12 14 4 24 4 34a16 16 0 1 0 32 0c0-10-8-20-16-32z" />
          </svg>
          <span className="droplet-theme-toggle__icon">
            {isDark ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 14.5A7.5 7.5 0 0 1 9.2 17.2 7.5 7.5 0 1 0 21 14.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            )}
          </span>
        </span>

        {!compact ? (
          <span className="droplet-theme-toggle__modes" aria-hidden="true">
            <span className={isDark ? '' : 'is-active'}>Light</span>
            <span className={isDark ? 'is-active' : ''}>Dark</span>
          </span>
        ) : null}
      </button>
    </div>
  );
};

export default DropletThemeToggle;