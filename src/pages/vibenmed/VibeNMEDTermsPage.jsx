import VibeNMEDLegalDocument from '../../components/vibenmed/VibeNMEDLegalDocument';
import { useVibenmedLegal } from '../../hooks/useContent';

const VibeNMEDTermsPage = () => {
  const { termsBodyHtml } = useVibenmedLegal();

  return <VibeNMEDLegalDocument title="Terms of Service" html={termsBodyHtml} />;
};

export default VibeNMEDTermsPage;