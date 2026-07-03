import { useState } from 'react';
import { Link } from 'react-router-dom';
import BusinessCardShell from '../../components/BusinessCardShell';
import DropletThemeToggle from '../../components/DropletThemeToggle';
import StudioWebsiteLayout from '../../components/studio/StudioWebsiteLayout';
import { useStudioPageScroll } from '../../hooks/useStudioPageScroll';
import ProjectStartInquiryForm from '../../components/studio/ProjectStartInquiryForm';
import { useDropElevate, useSiteContact } from '../../hooks/useContent';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/pages/_dropAndElevate.scss';
import '../../styles/pages/_studioWideContent.scss';

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const buildMailtoLink = ({ email, service, contactEmail, serviceOptions }) => {
  const serviceLabel =
    serviceOptions.find((option) => option.value === service)?.label ?? 'General inquiry';

  const subject = encodeURIComponent(`Drop & Elevate inquiry — ${serviceLabel}`);
  const body = encodeURIComponent(
    `Service: ${serviceLabel}\nReply to: ${email.trim()}\n\nI'd like to learn more about this service.`,
  );

  return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
};

const InquiryForm = ({
  service,
  setService,
  email,
  setEmail,
  submitted,
  setSubmitted,
  onSend,
  canSend,
  emailReady,
  embed = false,
  embedDetail = false,
  contactEmail,
  serviceOptions,
}) => {
  if (submitted) {
    return (
      <div
        className={`drop-elevate-page__confirmation${embed ? ' drop-elevate-page__confirmation--embed' : ''}`}
        role="status"
      >
        <p className="drop-elevate-page__confirmation-title">Ready to send</p>
        <p className="drop-elevate-page__confirmation-copy">
          {embed ? (
            <>Your email app should open with your message pre-filled.</>
          ) : (
            <>
              Your email app should open with your message pre-filled. If it did not, reach us
              directly at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </>
          )}
        </p>
        <button
          type="button"
          className="drop-elevate-page__submit"
          onClick={() => {
            setSubmitted(false);
            setEmail('');
            if (!embedDetail) {
              setService('');
            }
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div
      className={`drop-elevate-page__form${embed ? ' drop-elevate-page__form--embed' : ''}${embedDetail ? ' drop-elevate-page__form--embed-detail' : ''}`}
    >
      <label className="drop-elevate-page__field">
        <span className="drop-elevate-page__label">Service</span>
        <select
          name="service"
          value={service}
          onChange={(event) => setService(event.target.value)}
          className={service ? '' : 'drop-elevate-page__select--placeholder'}
          required
        >
          <option value="" disabled>
            Choose a service
          </option>
          {serviceOptions.filter((option) => option.value).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="drop-elevate-page__field">
        <span className="drop-elevate-page__label">Email</span>
        {emailReady ? (
          <div className="drop-elevate-page__email-action">
            <button
              type="button"
              className="drop-elevate-page__send-email"
              onClick={onSend}
              disabled={!canSend}
            >
              Send email
            </button>
            <button
              type="button"
              className="drop-elevate-page__edit-email"
              onClick={() => setEmail('')}
            >
              Change email
            </button>
          </div>
        ) : (
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            inputMode="email"
            placeholder="Your email address"
            aria-label="Your email address"
          />
        )}
      </div>
    </div>
  );
};

const DropElevateEmbedContent = ({ services, toProjectType }) => {
  const [selectedService, setSelectedService] = useState(null);

  const openInquiry = (serviceId) => {
    const serviceItem = services.find((item) => item.id === serviceId) ?? null;
    setSelectedService(serviceItem);
  };

  const closeInquiry = () => {
    setSelectedService(null);
  };

  if (selectedService) {
    return (
      <div className="de-embed de-embed--inquiry">
        <button type="button" className="de-embed__back" onClick={closeInquiry}>
          &larr; All services
        </button>

        <div className="de-embed__inquiry-panel studio-website__panel">
          <ProjectStartInquiryForm
            key={selectedService.id}
            titleId="de-embed-inquiry-title"
            initialProjectType={toProjectType[selectedService.id] ?? ''}
            serviceLabel={selectedService.title}
            serviceDescription={selectedService.description}
            showEmailFallback={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="de-embed de-embed--grid">
      <p className="de-embed__lead">Select a service to open the inquiry form.</p>

      <ul className="de-embed__grid" aria-label="Services offered">
        {services.map((item) => (
          <li key={item.id} className="de-embed__grid-item">
            <button
              type="button"
              className="de-embed__tile"
              onClick={() => openInquiry(item.id)}
              aria-label={`${item.title} — ${item.actionLabel}`}
            >
              <span className="de-embed__tile-corner de-embed__tile-corner--tl" aria-hidden="true" />
              <span className="de-embed__tile-corner de-embed__tile-corner--br" aria-hidden="true" />
              <div className="de-embed__tile-main">
                <h3 className="de-embed__tile-title">{item.title}</h3>
                <p className="de-embed__tile-desc">{item.description}</p>
              </div>
              <div className="de-embed__tile-hover" aria-hidden="true">
                <span className="de-embed__tile-cta">{item.actionLabel}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DropElevateWideContent = ({ formProps, services }) => {
  const { setService } = formProps;

  const handleServiceSelect = (serviceId) => {
    setService(serviceId);
    document.getElementById('de-inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="de-wide__layout">
      <section className="de-wide__services-section" aria-label="Services offered">
        <ul className="de-wide__services">
          {services.map((item) => (
            <li key={item.id} className="de-wide__service-item">
              <button
                type="button"
                id={item.id}
                className="de-wide__service studio-website__panel"
                onClick={() => handleServiceSelect(item.id)}
                aria-label={`${item.title} — ${item.actionLabel}`}
              >
                <span className="de-wide__service-mark" aria-hidden="true" />
                <div className="de-wide__service-body">
                  <h3 className="de-wide__service-title">{item.title}</h3>
                  <p className="de-wide__service-copy">{item.description}</p>
                  <span className="de-wide__service-cta">{item.actionLabel}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="de-inquiry"
        className="de-wide__inquiry de-wide__inquiry--banner studio-website__panel"
        aria-labelledby="de-inquiry-heading"
      >
        <div className="de-wide__inquiry-inner">
          <div className="de-wide__inquiry-intro">
            <p className="de-wide__inquiry-eyebrow">Ready when you are</p>
            <h2 id="de-inquiry-heading" className="de-wide__inquiry-title">
              Start a project
            </h2>
            <p className="de-wide__inquiry-copy">
              Choose a service and share your email — we will open a pre-filled message so you can
              reach CloudDropDesigns directly.
            </p>
            <ul className="de-wide__inquiry-steps" aria-label="What happens next">
              <li>Pick the service that fits your goal</li>
              <li>Send a quick note from your email app</li>
              <li>Hear back from the studio directly</li>
            </ul>
          </div>

          <div className="de-wide__inquiry-form">
            <InquiryForm {...formProps} />
          </div>
        </div>
      </section>
    </div>
  );
};

const DropAndElevatePage = ({ embed = false }) => {
  const { theme } = useTheme();
  const { services, serviceOptions, toProjectType } = useDropElevate();
  const { email: contactEmail } = useSiteContact();
  const [service, setService] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailReady = isValidEmail(email);
  const canSend = emailReady && Boolean(service);

  useStudioPageScroll(theme, embed);

  const handleSend = () => {
    if (!canSend) return;
    window.location.href = buildMailtoLink({ email, service, contactEmail, serviceOptions });
    setSubmitted(true);
  };

  const formProps = {
    service,
    setService,
    email,
    setEmail,
    submitted,
    setSubmitted,
    onSend: handleSend,
    canSend,
    emailReady,
    contactEmail,
    serviceOptions,
  };

  if (embed) {
    return <DropElevateEmbedContent services={services} toProjectType={toProjectType} />;
  }

  return (
    <>
      <div className="studio-mobile-only drop-elevate-page drop-elevate-page--mobile">
        <DropletThemeToggle className="drop-elevate-page__theme-toggle" compact />

        <div className="drop-elevate-page__shell">
          <BusinessCardShell>
            <div className="drop-elevate-page__body">
              <header className="drop-elevate-page__intro">
                <p className="drop-elevate-page__eyebrow">Design &amp; Development Studio</p>
                <h1 className="drop-elevate-page__title">Drop &amp; Elevate</h1>
              </header>

              <section className="drop-elevate-page__services" aria-labelledby="services-heading">
                <div className="drop-elevate-page__section-head">
                  <h2 id="services-heading" className="drop-elevate-page__section-title">
                    Services offered
                  </h2>
                  <span className="drop-elevate-page__section-rule" aria-hidden="true" />
                </div>

                <ul className="drop-elevate-page__service-list">
                  {services.map((item) => (
                    <li key={item.id} id={item.id} className="drop-elevate-page__service-item">
                      <span className="drop-elevate-page__service-mark" aria-hidden="true" />
                      <div>
                        <h3 className="drop-elevate-page__service-title">{item.title}</h3>
                        <p className="drop-elevate-page__service-copy">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="drop-elevate-page__inquiry" aria-labelledby="inquiry-heading">
                <div className="drop-elevate-page__section-head">
                  <h2 id="inquiry-heading" className="drop-elevate-page__section-title">
                    Send a message
                  </h2>
                  <span className="drop-elevate-page__section-rule" aria-hidden="true" />
                </div>
                <InquiryForm {...formProps} />
              </section>

              <footer className="drop-elevate-page__footer">
                <Link className="drop-elevate-page__back" to="/">
                  Return to card
                </Link>
              </footer>
            </div>
          </BusinessCardShell>
        </div>
      </div>

      <div className="studio-wide-only">
        <StudioWebsiteLayout activeId="drop-and-elevate" className="de-wide">
          <DropElevateWideContent formProps={formProps} services={services} />
        </StudioWebsiteLayout>
      </div>
    </>
  );
};

export default DropAndElevatePage;