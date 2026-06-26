import AppStoreBadge from './AppStoreBadge';
import GooglePlayBadge from './GooglePlayBadge';
import '../../styles/components/_storeBadges.scss';

const StoreDownloadBadges = ({ className = '' }) => {
  return (
    <div className={`store-badges ${className}`.trim()}>
      <AppStoreBadge />
      <GooglePlayBadge />
    </div>
  );
};

export default StoreDownloadBadges;