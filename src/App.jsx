import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VibeNMEDLandingPage from './pages/vibenmed/VibeNMEDLandingPage';
import VibeNMEDPrivacyPage from './pages/vibenmed/VibeNMEDPrivacyPage';
import VibeNMEDTermsPage from './pages/vibenmed/VibeNMEDTermsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/vibenmed" element={<VibeNMEDLandingPage />} />
      <Route path="/vibenmed/privacy" element={<VibeNMEDPrivacyPage />} />
      <Route path="/vibenmed/terms" element={<VibeNMEDTermsPage />} />
    </Routes>
  );
};

export default App;