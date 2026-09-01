import { useState } from 'react';
import { Link } from 'react-router-dom';
import BusinessCardShell from '../../components/BusinessCardShell';
import DropletThemeToggle from '../../components/DropletThemeToggle';
import ProjectStartInquiryModal from '../../components/studio/ProjectStartInquiryModal';
import StudioWebsiteLayout from '../../components/studio/StudioWebsiteLayout';
import { useGetProfessional } from '../../hooks/useContent';
import { useStudioPageScroll } from '../../hooks/useStudioPageScroll';
import { useTheme } from '../../context/ThemeContext';
import { useWideStudio } from '../../hooks/useWideStudio';
import '../../styles/pages/_getProfessional.scss';
import '../../styles/pages/_studioWideContent.scss';

const GetProfessionalWideContent = ({
  onStartProject,
  expertise,
  workingPrinciples,
  profile,
}) => (
  <div className="gp-wide__body">
    <section
      className="gp-wide__profile studio-website__panel"
      aria-label="Paul Cloud profile"
    >
      <div className="gp-wide__profile-media">
        <img
          src={profile.photo}
          alt={profile.photoAlt}
          className="gp-wide__portrait"
          width={280}
          height={350}
          loading="eager"
          decoding="sync"
        />
      </div>

      <div className="gp-wide__profile-identity">
        <h2 className="gp-wide__name">{profile.name}</h2>
        <p className="gp-wide__role">{profile.title}</p>
        <p className="gp-wide__experience">{profile.experience}</p>
      </div>

      <div className="gp-wide__profile-about">
        <p className="gp-wide__about-eyebrow">About</p>
        <p className="gp-wide__bio">{profile.bio}</p>
      </div>
    </section>

    <section
      className="studio-website__section gp-wide__section"
      aria-labelledby="gp-expertise-heading"
    >
      <div className="studio-website__section-head">
        <h2 id="gp-expertise-heading" className="studio-website__section-title">
          What I build
        </h2>
        <span className="studio-website__section-rule" aria-hidden="true" />
      </div>

      <ul className="gp-wide__build-grid">
        {expertise.map((item, index) => (
          <li key={item.id} className="gp-wide__build-card studio-website__panel">
            <span className="gp-wide__build-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="gp-wide__expertise-label">{item.label}</h3>
            <p className="gp-wide__expertise-detail">{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>

    <section
      className="studio-website__section gp-wide__section"
      aria-labelledby="gp-working-heading"
    >
      <div className="studio-website__section-head">
        <h2 id="gp-working-heading" className="studio-website__section-title">
          Working with me
        </h2>
        <span className="studio-website__section-rule" aria-hidden="true" />
      </div>

      <ul className="gp-wide__principles-list">
        {workingPrinciples.map((item, index) => (
          <li key={item} className="gp-wide__principles-item">
            <span className="gp-wide__principles-marker" aria-hidden="true">
              {index + 1}
            </span>
            <span className="gp-wide__principles-text">{item}</span>
          </li>
        ))}
      </ul>
    </section>

    <section
      className="studio-website__section gp-wide__start studio-website__panel"
      aria-labelledby="gp-start-heading"
    >
      <div className="gp-wide__start-inner">
        <div className="gp-wide__start-copy-block">
          <p className="gp-wide__start-eyebrow">Ready when you are</p>
          <h2 id="gp-start-heading" className="gp-wide__start-title">
            Ready to begin?
          </h2>
          <p className="gp-wide__start-copy">
            Open the project form with your name, description, preferred meeting times, and other
            details we need to get started.
          </p>
        </div>

        <div className="gp-wide__start-action">
          <button type="button" className="gp-wide__start-cta" onClick={onStartProject}>
            <span className="gp-wide__start-cta-label">Start a project</span>
            <span className="gp-wide__start-cta-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  </div>
);

const GetProfessionalPage = ({ embed = false }) => {
  const isWide = useWideStudio();
  const { theme } = useTheme();
  const { expertise, workingPrinciples, profile, links } = useGetProfessional();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  useStudioPageScroll(theme, embed);

  const openInquiry = () => setInquiryOpen(true);
  const closeInquiry = () => setInquiryOpen(false);

  if (embed) {
    return (
      <div className="get-professional-wide gp-wide-embed">
        <GetProfessionalWideContent
          onStartProject={openInquiry}
          expertise={expertise}
          workingPrinciples={workingPrinciples}
          profile={profile}
        />
        <ProjectStartInquiryModal open={inquiryOpen} onClose={closeInquiry} />
      </div>
    );
  }

  if (isWide) {
    return (
      <>
        <StudioWebsiteLayout activeId="get-professional" className="get-professional-wide">
          <GetProfessionalWideContent
            onStartProject={openInquiry}
            expertise={expertise}
            workingPrinciples={workingPrinciples}
            profile={profile}
          />
        </StudioWebsiteLayout>
        <ProjectStartInquiryModal open={inquiryOpen} onClose={closeInquiry} />
      </>
    );
  }

  return (
    <>
      <div className="get-professional-page get-professional-page--mobile">
        <DropletThemeToggle className="get-professional-page__theme-toggle" compact />

        <div className="get-professional-page__shell">
          <BusinessCardShell>
            <div className="get-professional-page__body">
              <header className="get-professional-page__intro">
                <p className="get-professional-page__eyebrow">Design &amp; Development Studio</p>
                <h1 className="get-professional-page__page-title">Get Professional</h1>
              </header>

              <section className="get-professional-page__profile" aria-label="Paul Cloud profile">
                <img
                  src={profile?.photo}
                  alt={profile?.photoAlt}
                  className="get-professional-page__portrait"
                  width={320}
                  height={400}
                  loading="eager"
                  decoding="sync"
                />

                <div className="get-professional-page__identity">
                  <h2 className="get-professional-page__name">{profile.name}</h2>
                  <p className="get-professional-page__title">{profile.title}</p>
                  <p className="get-professional-page__experience">{profile.experience}</p>
                </div>

                <div className="get-professional-page__bio">
                  <p className="get-professional-page__bio-copy">{profile.mobileBio}</p>
                </div>
              </section>

              <section className="get-professional-page__start">
                <button type="button" className="get-professional-page__start-cta" onClick={openInquiry}>
                  Start a project
                </button>
              </section>

              <nav className="get-professional-page__social" aria-label="Social profiles">
                <ul className="get-professional-page__social-list">
                  {links.map((link) => (
                    <li key={link.id} className="get-professional-page__social-item">
                      <a
                        href={link.href}
                        className="get-professional-page__social-link"
                        aria-label={`${link.label} (${link.handle})`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={link.icon}
                          alt=""
                          className="get-professional-page__social-icon"
                          width={22}
                          height={22}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <footer className="get-professional-page__footer">
                <Link className="get-professional-page__back" to="/">
                  Return to card
                </Link>
              </footer>
            </div>
          </BusinessCardShell>
        </div>
      </div>

      <ProjectStartInquiryModal open={inquiryOpen} onClose={closeInquiry} />
    </>
  );
};

export default GetProfessionalPage;