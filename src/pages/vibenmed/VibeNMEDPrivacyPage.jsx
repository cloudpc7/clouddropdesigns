import VibeNMEDLegalDocument from '../../components/vibenmed/VibeNMEDLegalDocument';
import { PRIVACY_POLICY_HTML } from '../../content/vibenmedLegalContent';

const VibeNMEDPrivacyPage = () => {
  return <VibeNMEDLegalDocument title="Privacy Policy" html={PRIVACY_POLICY_HTML} />;
};

export default VibeNMEDPrivacyPage;