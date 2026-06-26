import googlePlayBadge from '../../assets/vibenmed/GetItOnGooglePlay_Badge_Web_color_English.png';
import { VIBENMED_GOOGLE_PLAY_URL } from '../../config/vibenmedStoreLinks';
import '../../styles/components/_googlePlayBadge.scss';

/**
 * Official “Get it on Google Play” badge per Google Play Badge guidelines.
 * Asset is unmodified; links directly to the Play Store listing.
 */
const GooglePlayBadge = ({ className = '' }) => {
  return (
    <a
      href={VIBENMED_GOOGLE_PLAY_URL}
      className={`google-play-badge ${className}`.trim()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
    >
      <img
        src={googlePlayBadge}
        alt="Get it on Google Play"
        width={270}
        height={80}
        loading="lazy"
      />
    </a>
  );
};

export default GooglePlayBadge;