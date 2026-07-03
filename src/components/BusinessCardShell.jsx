const BusinessCardShell = ({ children, className = '' }) => {
  return (
    <article className={`business-card ${className}`.trim()}>
      <div className="business-card__texture" aria-hidden="true" />

      <div className="business-card__frame" aria-hidden="true">
        <span className="business-card__corner business-card__corner--tl" />
        <span className="business-card__corner business-card__corner--tr" />
        <span className="business-card__corner business-card__corner--bl" />
        <span className="business-card__corner business-card__corner--br" />
      </div>

      <header className="business-card__crest" aria-hidden="true">
        <span className="business-card__crest-line" />
        <span className="business-card__crest-mark">CD</span>
        <span className="business-card__crest-line" />
      </header>

      {children}
    </article>
  );
};

export default BusinessCardShell;