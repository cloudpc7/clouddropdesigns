import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserDoctor,
  faShieldHalved,
  faComments,
  faRoute,
  faCalendarDays,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import VibeNMEDLayout from '../../components/vibenmed/VibeNMEDLayout';
import icon from '../../assets/vibenmed/play_store_512.png';
import loginScreen from '../../assets/vibenmed/loginscreen.png';
import matchingProfile from '../../assets/vibenmed/matching-profile.png';
import extendedProfile from '../../assets/vibenmed/extended-profile.png';
import messaging from '../../assets/vibenmed/messaging.png';
import calendar from '../../assets/vibenmed/calendar.png';
import '../../styles/pages/_vibenmed.scss';

const features = [
  {
    icon: faUserDoctor,
    title: 'Smart Matching',
    copy: 'Discover verified healthcare students and professionals aligned with your specialty, school, and goals.',
  },
  {
    icon: faShieldHalved,
    title: 'Verified Profiles',
    copy: 'Build trust with document verification, professional details, and safety-first account controls.',
  },
  {
    icon: faComments,
    title: 'Secure Messaging',
    copy: 'Connect through private, in-app conversations designed for peer support and clinical collaboration.',
  },
  {
    icon: faRoute,
    title: 'Med Journey',
    copy: 'Track milestones across your medical path with a profile built for every stage of training.',
  },
  {
    icon: faCalendarDays,
    title: 'Clinical Calendar',
    copy: 'Organize rotations, events, and important dates in one focused workspace.',
  },
  {
    icon: faLocationDot,
    title: 'Local Discovery',
    copy: 'Find nearby schools and local professionals when you choose to share location access.',
  },
];

const showcase = [
  { src: loginScreen, label: 'Secure sign-in' },
  { src: matchingProfile, label: 'Profile matching' },
  { src: extendedProfile, label: 'Rich profiles' },
  { src: messaging, label: 'Secure messaging' },
  { src: calendar, label: 'Clinical calendar' },
];

const VibeNMEDLandingPage = () => {
  return (
    <VibeNMEDLayout>
      <section className="vibenmed-hero">
        <div className="vibenmed-hero__glow" aria-hidden="true" />
        <div className="vibenmed-hero__inner">
          <div className="vibenmed-hero__copy">
            <p className="vibenmed-hero__eyebrow">Mobile application by Cloud Drop Designs LLC</p>
            <h1>VibeNMED</h1>
            <p className="vibenmed-hero__tagline">
              Connect. Collaborate. Grow in healthcare.
            </p>
            <p className="vibenmed-hero__desc">
              A secure, professional platform for matched healthcare students and professionals —
              built for peer support, networking, and clinical collaboration.
            </p>
            <div className="vibenmed-hero__cta">
              <a href="#about" className="vibenmed-btn vibenmed-btn--primary">
                Learn more
              </a>
              <a href="mailto:cloud@clouddropdesigns.com" className="vibenmed-btn vibenmed-btn--ghost">
                Contact us
              </a>
            </div>
          </div>

          <div className="vibenmed-hero__device">
            <div className="vibenmed-phone">
              <div className="vibenmed-phone__shell">
                <img src={loginScreen} alt="VibeNMED app login screen" />
              </div>
              <div className="vibenmed-phone__badge">
                <img src={icon} alt="" />
                <span>Available on iOS &amp; Android</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vibenmed-trust">
        <div className="vibenmed-trust__inner">
          <div>
            <strong>Verified</strong>
            <span>Professional identity checks</span>
          </div>
          <div>
            <strong>Secure</strong>
            <span>Firebase-backed infrastructure</span>
          </div>
          <div>
            <strong>Private</strong>
            <span>Controlled data &amp; messaging</span>
          </div>
          <div>
            <strong>Focused</strong>
            <span>Built for healthcare careers</span>
          </div>
        </div>
      </section>

      <section id="features" className="vibenmed-features">
        <div className="vibenmed-section-head">
          <p>Why VibeNMED</p>
          <h2>Everything you need to build meaningful healthcare connections</h2>
        </div>

        <div className="vibenmed-features__grid">
          {features.map((feature) => (
            <article key={feature.title} className="vibenmed-feature-card">
              <span className="vibenmed-feature-card__icon">
                <FontAwesomeIcon icon={feature.icon} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vibenmed-showcase">
        <div className="vibenmed-showcase__inner">
          <div className="vibenmed-section-head vibenmed-section-head--light">
            <p>Inside the app</p>
            <h2>Designed for clarity, confidence, and real clinical community</h2>
          </div>

          <div className="vibenmed-showcase__track">
            {showcase.map((item) => (
              <figure key={item.label} className="vibenmed-showcase__item">
                <div className="vibenmed-showcase__frame">
                  <img src={item.src} alt={`VibeNMED ${item.label}`} />
                </div>
                <figcaption>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="vibenmed-about">
        <div className="vibenmed-about__card">
          <p className="vibenmed-about__label">About VibeNMED</p>
          <h2>Secure healthcare networking, purpose-built for your career</h2>
          <p>
            VibeNMED is a secure and professional mobile application developed by Cloud Drop Designs LLC.
            It is designed to connect matched healthcare students and professionals, facilitating secure
            peer support, professional networking, and clinical collaboration.
          </p>
          <p>
            Whether you are navigating school, rotations, or early practice, VibeNMED gives you a trusted
            space to find your people, share your journey, and grow with confidence.
          </p>
        </div>
      </section>

      <section className="vibenmed-download">
        <div className="vibenmed-download__inner">
          <img src={icon} alt="" className="vibenmed-download__icon" />
          <div>
            <h2>Ready to join the community?</h2>
            <p>Download VibeNMED on your device or reach out for partnership and support inquiries.</p>
          </div>
          <a href="mailto:cloud@clouddropdesigns.com" className="vibenmed-btn vibenmed-btn--primary">
            Get in touch
          </a>
        </div>
      </section>
    </VibeNMEDLayout>
  );
};

export default VibeNMEDLandingPage;