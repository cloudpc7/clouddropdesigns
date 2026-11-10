import { useEffect, useState } from 'react';
import cloudWatermark from '../assets/cloud-icon.png';
import { useSelector } from 'react-redux';
import { selectDeviceType } from '../redux/slices/deviceSlice';
import { getWideHeroCloudSize } from '../utils/getCloudSize';
import CloudDropIcon from './CloudDropIcon';

const DESKTOP_CLOUD_SIZE = 340;

const getHeroCloudState = () => {
  const isDesktop = window.innerWidth >= 1024;
  const cloudSize = isDesktop ? DESKTOP_CLOUD_SIZE : getWideHeroCloudSize();

  return {
    isDesktop,
    cloudSize,
    isCompact: !isDesktop && cloudSize < 228,
  };
};

const HeroCloudAddition = () => {
  const isDesktopDevice = useSelector(selectDeviceType) === 'desktop';
  const [heroCloud, setHeroCloud] = useState({
    isDesktop: isDesktopDevice,
    cloudSize: isDesktopDevice ? DESKTOP_CLOUD_SIZE : 228,
    isCompact: false,
  });

  useEffect(() => {
    const handleResize = () => setHeroCloud(getHeroCloudState());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="hero-cloud-addition">
      <div
        className="hero-cloud-addition__watermark"
        style={{ backgroundImage: `url(${cloudWatermark})` }}
        aria-hidden="true"
      />
      <CloudDropIcon
        size={heroCloud.cloudSize}
        showSkyCaption={heroCloud.isDesktop || !heroCloud.isCompact}
        defaultMode="live"
        compact={heroCloud.isCompact}
      />
    </div>
  );
};

export default HeroCloudAddition;