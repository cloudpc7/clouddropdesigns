import appStoreBadge from '../../assets/vibenmed/Download_on_the_App_Store_Badge_US-UK_RGB_blk.svg';
import { VIBENMED_APP_STORE_URL } from '../../config/vibenmedStoreLinks';
import '../../styles/components/_storeBadges.scss';

/**
 * Official “Download on the App Store” badge per Apple Marketing Guidelines.
 * Uses the US preferred black lockup on light backgrounds.
 */
const AppStoreBadge = ({ className = '' }) => {
  return (
    <a
      href={VIBENMED_APP_STORE_URL}
      className={`store-badge store-badge--apple ${className}`.trim()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store"
    >
      <img
        src={appStoreBadge}
        alt="Download on the App Store"
        width={180}
        height={60}
        loading="lazy"
      />
    </a>
  );
};

export default AppStoreBadge;