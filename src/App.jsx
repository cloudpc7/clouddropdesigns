import { Routes, Route, useLocation } from 'react-router-dom';
import ContentGate from './components/ContentGate';
import ScrollToTop from './components/ScrollToTop';
import { usePageSeo } from './hooks/usePageSeo';
import HomePage from './pages/HomePage';
import SitemapPage from './pages/SitemapPage';
import CodeDropsPage from './pages/studio/CodeDropsPage';
import DropAndElevatePage from './pages/studio/DropAndElevatePage';
import GetProfessionalPage from './pages/studio/GetProfessionalPage';
import SkilledByDesignPage from './pages/studio/SkilledByDesignPage';
import StudioSectionPage from './pages/studio/StudioSectionPage';
import VibeNMEDLandingPage from './pages/vibenmed/VibeNMEDLandingPage';
import VibeNMEDPrivacyPage from './pages/vibenmed/VibeNMEDPrivacyPage';
import VibeNMEDTermsPage from './pages/vibenmed/VibeNMEDTermsPage';

const App = () => {
  const { pathname } = useLocation();
  usePageSeo(pathname);

  return (
    <ContentGate>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route path="/studio/code-drops" element={<CodeDropsPage />} />
        <Route path="/studio/drop-and-elevate" element={<DropAndElevatePage />} />
        <Route path="/studio/get-professional" element={<GetProfessionalPage />} />
        <Route path="/studio/skilled-by-design" element={<SkilledByDesignPage />} />
        <Route path="/studio/:sectionId" element={<StudioSectionPage />} />
        <Route path="/vibenmed" element={<VibeNMEDLandingPage />} />
        <Route path="/vibenmed/privacy" element={<VibeNMEDPrivacyPage />} />
        <Route path="/vibenmed/terms" element={<VibeNMEDTermsPage />} />
      </Routes>
    </ContentGate>
  );
};

export default App;