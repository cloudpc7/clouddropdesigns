import '../styles/layout/_footer.scss';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer__rule" aria-hidden="true" />
      <p className="site-footer__legal">© {year} CloudDropDesigns LLC</p>
    </footer>
  );
};

export default Footer;