import { Link } from 'react-router-dom';
import BusinessCardShell from '../../components/BusinessCardShell';
import DropletThemeToggle from '../../components/DropletThemeToggle';
import StudioWebsiteLayout from '../../components/studio/StudioWebsiteLayout';
import { useSkilledByDesign } from '../../hooks/useContent';
import { useStudioPageScroll } from '../../hooks/useStudioPageScroll';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/pages/_skilledByDesign.scss';
import '../../styles/pages/_studioWideContent.scss';

const SkilledByDesignPage = ({ embed = false }) => {
  const { mantra, toolGroups } = useSkilledByDesign();
  const { theme } = useTheme();
  useStudioPageScroll(theme, embed);

  if (embed) {
    return (
      <div className="skilled-wide">
        <section aria-label="Studio rhythm" style={{ marginTop: 0 }}>
          <ul className="skilled-wide__mantra">
            {mantra.map((word, index) => (
              <li key={word} className="skilled-wide__mantra-item">
                <span>{word}</span>
                {index < mantra.length - 1 && (
                  <span className="skilled-wide__mantra-dot" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="studio-website__section" aria-labelledby="skilled-toolkit-heading">
          <div className="studio-website__section-head">
            <h2 id="skilled-toolkit-heading" className="studio-website__section-title">
              Developer toolkit
            </h2>
            <span className="studio-website__section-rule" aria-hidden="true" />
          </div>

          <div className="skilled-wide__groups">
            {toolGroups.map((group) => (
              <article key={group.id} className="skilled-wide__group studio-website__panel">
                <h3 className="skilled-wide__group-label">{group.label}</h3>
                <ul className="skilled-wide__tool-grid">
                  {group.tools.map((tool) => (
                    <li key={tool.id} className="skilled-wide__tool-cell">
                      <span className="skilled-wide__tool-tile">
                        <img
                          src={tool.icon}
                          alt=""
                          className="skilled-wide__tool-icon"
                          width={44}
                          height={44}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="skilled-wide__tool-name">{tool.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="studio-mobile-only skilled-page skilled-page--mobile">
        <DropletThemeToggle className="skilled-page__theme-toggle" compact />

        <div className="skilled-page__shell">
          <BusinessCardShell>
            <div className="skilled-page__body">
              <header className="skilled-page__intro">
                <p className="skilled-page__eyebrow">Design &amp; Development Studio</p>
                <h1 className="skilled-page__title">
                  Skilled <em>By</em> Design
                </h1>
                <p className="skilled-page__lede">
                  Precision-built digital work — from interface craft to deployment, every layer is
                  intentional.
                </p>
              </header>

              <section className="skilled-page__mantra-band" aria-label="Studio rhythm">
                <ul className="skilled-page__mantra">
                  {mantra.map((word, index) => (
                    <li key={word} className="skilled-page__mantra-item">
                      <span>{word}</span>
                      {index < mantra.length - 1 && (
                        <span className="skilled-page__mantra-dot" aria-hidden="true" />
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="skilled-page__tools" aria-labelledby="tools-heading">
                <div className="skilled-page__section-head">
                  <h2 id="tools-heading" className="skilled-page__section-title">
                    Developer toolkit
                  </h2>
                  <span className="skilled-page__section-rule" aria-hidden="true" />
                </div>

                <div className="skilled-page__tool-panel">
                  {toolGroups.map((group) => (
                    <article key={group.id} className="skilled-page__tool-group">
                      <h3 className="skilled-page__tool-group-label">{group.label}</h3>
                      <ul className="skilled-page__tool-grid">
                        {group.tools.map((tool) => (
                          <li key={tool.id} className="skilled-page__tool-cell">
                            <span className="skilled-page__tool-tile">
                              <img
                                src={tool.icon}
                                alt=""
                                className="skilled-page__tool-icon"
                                width={44}
                                height={44}
                                loading="lazy"
                                decoding="async"
                              />
                            </span>
                            <span className="skilled-page__tool-name">{tool.label}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <footer className="skilled-page__footer">
                <Link className="skilled-page__back" to="/">
                  Return to card
                </Link>
              </footer>
            </div>
          </BusinessCardShell>
        </div>
      </div>

      <div className="studio-wide-only">
        <StudioWebsiteLayout activeId="skilled-by-design" className="skilled-wide">
          <section aria-label="Studio rhythm">
            <ul className="skilled-wide__mantra">
              {mantra.map((word, index) => (
                <li key={word} className="skilled-wide__mantra-item">
                  <span>{word}</span>
                  {index < mantra.length - 1 && (
                    <span className="skilled-wide__mantra-dot" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="studio-website__section" aria-label="Developer toolkit">
            <div className="skilled-wide__groups">
              {toolGroups.map((group) => (
                <article key={group.id} className="skilled-wide__group studio-website__panel">
                  <h3 className="skilled-wide__group-label">{group.label}</h3>
                  <ul className="skilled-wide__tool-grid">
                    {group.tools.map((tool) => (
                      <li key={tool.id} className="skilled-wide__tool-cell">
                        <span className="skilled-wide__tool-tile">
                          <img
                            src={tool.icon}
                            alt=""
                            className="skilled-wide__tool-icon"
                            width={44}
                            height={44}
                            loading="lazy"
                            decoding="async"
                          />
                        </span>
                        <span className="skilled-wide__tool-name">{tool.label}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </StudioWebsiteLayout>
      </div>
    </>
  );
};

export default SkilledByDesignPage;