import { Link } from 'react-router-dom';
import BusinessCardShell from '../../components/BusinessCardShell';
import DropletThemeToggle from '../../components/DropletThemeToggle';
import StudioWebsiteLayout from '../../components/studio/StudioWebsiteLayout';
import { useSkilledByDesign } from '../../hooks/useContent';
import { useStudioPageScroll } from '../../hooks/useStudioPageScroll';
import { useTheme } from '../../context/ThemeContext';
import { useWideStudio } from '../../hooks/useWideStudio';
import '../../styles/pages/_skilledByDesign.scss';
import '../../styles/pages/_studioWideContent.scss';

const prefixForVariant = (variant) => (variant === 'wide' ? 'skilled-wide' : 'skilled-page');

const SkilledMantra = ({ mantra, variant }) => {
  const prefix = prefixForVariant(variant);

  const list = (
    <ul className={`${prefix}__mantra`}>
      {mantra.map((word, index) => (
        <li key={word} className={`${prefix}__mantra-item`}>
          <span>{word}</span>
          {index < mantra.length - 1 && (
            <span className={`${prefix}__mantra-dot`} aria-hidden="true" />
          )}
        </li>
      ))}
    </ul>
  );

  if (variant === 'mobile') {
    return (
      <section className={`${prefix}__mantra-band`} aria-label="Studio rhythm">
        {list}
      </section>
    );
  }

  return <section aria-label="Studio rhythm">{list}</section>;
};

const SkilledNarrative = ({ narrative, variant }) => {
  const prefix = prefixForVariant(variant);
  return <p className={`${prefix}__narrative`}>{narrative}</p>;
};

const SkilledToolCell = ({ tool, variant }) => {
  const prefix = prefixForVariant(variant);
  const tile = (
    <span className={`${prefix}__tool-tile`}>
      <img
        src={tool.icon}
        alt=""
        className={`${prefix}__tool-icon`}
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
  const label = <span className={`${prefix}__tool-name`}>{tool.label}</span>;

  if (tool.href) {
    const external = tool.href.startsWith('http');

    return (
      <li className={`${prefix}__tool-cell ${prefix}__tool-cell--link`}>
        <a
          href={tool.href}
          className={`${prefix}__tool-link`}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {tile}
          {label}
        </a>
      </li>
    );
  }

  return (
    <li className={`${prefix}__tool-cell`}>
      {tile}
      {label}
    </li>
  );
};

const SkilledToolkit = ({ toolGroups, variant, showHeading = false }) => {
  const prefix = prefixForVariant(variant);
  const isWide = variant === 'wide';

  const groups = (
    <div className={isWide ? `${prefix}__groups` : `${prefix}__tool-panel`}>
      {toolGroups.map((group) => (
        <article
          key={group.id}
          className={
            isWide
              ? `${prefix}__group studio-website__panel`
              : `${prefix}__tool-group`
          }
        >
          <h3 className={isWide ? `${prefix}__group-label` : `${prefix}__tool-group-label`}>
            {group.label}
          </h3>
          <ul className={`${prefix}__tool-grid`}>
            {group.tools.map((tool) => (
              <SkilledToolCell key={tool.id} tool={tool} variant={variant} />
            ))}
          </ul>
        </article>
      ))}
    </div>
  );

  if (!showHeading) {
    return groups;
  }

  return (
    <section className={isWide ? 'studio-website__section' : `${prefix}__tools`} aria-labelledby="skilled-toolkit-heading">
      <div className={isWide ? 'studio-website__section-head' : `${prefix}__section-head`}>
        <h2
          id="skilled-toolkit-heading"
          className={isWide ? 'studio-website__section-title' : `${prefix}__section-title`}
        >
          Developer toolkit
        </h2>
        <span
          className={isWide ? 'studio-website__section-rule' : `${prefix}__section-rule`}
          aria-hidden="true"
        />
      </div>
      {groups}
    </section>
  );
};

const SkilledProofCta = ({ proofCta, variant }) => {
  const prefix = prefixForVariant(variant);

  return (
    <div className={`${prefix}__proof`}>
      <Link to={proofCta.path} className={`${prefix}__proof-link`}>
        {proofCta.label}
        <span aria-hidden="true"> →</span>
      </Link>
    </div>
  );
};

const SkilledWideBody = ({ mantra, narrative, toolGroups, proofCta }) => (
  <div className="skilled-wide">
    <SkilledMantra mantra={mantra} variant="wide" />
    <SkilledNarrative narrative={narrative} variant="wide" />
    <SkilledToolkit toolGroups={toolGroups} variant="wide" showHeading />
    <SkilledProofCta proofCta={proofCta} variant="wide" />
  </div>
);

const SkilledByDesignPage = ({ embed = false }) => {
  const isWide = useWideStudio();
  const { mantra, narrative, toolGroups, proofCta } = useSkilledByDesign();
  const { theme } = useTheme();
  useStudioPageScroll(theme, embed);

  if (embed) {
    return (
      <SkilledWideBody
        mantra={mantra}
        narrative={narrative}
        toolGroups={toolGroups}
        proofCta={proofCta}
      />
    );
  }

  if (isWide) {
    return (
      <StudioWebsiteLayout activeId="skilled-by-design">
        <SkilledWideBody
          mantra={mantra}
          narrative={narrative}
          toolGroups={toolGroups}
          proofCta={proofCta}
        />
      </StudioWebsiteLayout>
    );
  }

  return (
    <div className="skilled-page skilled-page--mobile">
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

            <SkilledMantra mantra={mantra} variant="mobile" />
            <SkilledNarrative narrative={narrative} variant="mobile" />
            <SkilledToolkit toolGroups={toolGroups} variant="mobile" showHeading />
            <SkilledProofCta proofCta={proofCta} variant="mobile" />

            <footer className="skilled-page__footer">
              <Link className="skilled-page__back" to="/">
                Return to card
              </Link>
            </footer>
          </div>
        </BusinessCardShell>
      </div>
    </div>
  );
};

export default SkilledByDesignPage;