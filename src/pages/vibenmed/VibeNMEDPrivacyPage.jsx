import VibeNMEDLegalDocument from '../../components/vibenmed/VibeNMEDLegalDocument';
import { useVibenmedLegal } from '../../hooks/useContent';

const VibeNMEDPrivacyPage = () => {
  const { privacyPolicyHtml } = useVibenmedLegal();

  return <VibeNMEDLegalDocument title="Privacy Policy" html={privacyPolicyHtml} />;
};

export default VibeNMEDPrivacyPage;