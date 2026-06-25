import VibeNMEDLegalDocument from '../../components/vibenmed/VibeNMEDLegalDocument';
import { TERMS_BODY_HTML } from '../../content/vibenmedLegalContent';

const VibeNMEDTermsPage = () => {
  return <VibeNMEDLegalDocument title="Terms of Service" html={TERMS_BODY_HTML} />;
};

export default VibeNMEDTermsPage;