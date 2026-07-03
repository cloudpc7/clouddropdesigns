import { useEffect, useState } from 'react';
import cloudWatermark from '../assets/cloud-icon.png';
import { useSiteSlogan } from '../hooks/useContent';
import { getCardHeroCloudSize } from '../utils/getCloudSize';
import CloudDropIcon from './CloudDropIcon';
import '../styles/layout/_hero.scss';

const stopFlip = (event) => {
  event.stopPropagation();
};

const Hero = () => {
  const siteSlogan = useSiteSlogan();
  const [sloganTop, sloganBottom] = siteSlogan.split(' & ');
  const [cloudSize, setCloudSize] = useState(getCardHeroCloudSize);
  const isCompact = cloudSize < 228;

  useEffect(() => {
    const handleResize = () => setCloudSize(getCardHeroCloudSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">CloudDropDesigns</h1>
        <p className="hero__subtitle hero__subtitle--top">{sloganTop}</p>
        <div className="hero__cloud" onClick={stopFlip} onKeyDown={stopFlip}>
          <div
            className="hero__watermark"
            style={{ backgroundImage: `url(${cloudWatermark})` }}
            aria-hidden="true"
          />
          <CloudDropIcon
            size={cloudSize}
            showSkyCaption={!isCompact}
            defaultMode="live"
            compact={isCompact}
          />
        </div>
        <p className="hero__subtitle hero__subtitle--bottom">
          <span className="hero__subtitle-amp">&</span> {sloganBottom}
        </p>
      </div>
    </section>
  );
};

export default Hero;