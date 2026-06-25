import CloudDropIcon from './CloudDropIcon';
import '../styles/layout/_hero.scss';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">CloudDropDesigns</h1>
        <CloudDropIcon size={360} showSkyCaption defaultMode="live" />
      </div>
    </section>
  );
};

export default Hero;