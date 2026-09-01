import { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ContentGate from './components/ContentGate';
import RouteFallback from './components/RouteFallback';
import ScrollToTop from './components/ScrollToTop';
import { usePageSeo } from './hooks/usePageSeo';
import { normalizePathname } from './utils/pathUtils';
import HomePage from './pages/HomePage';
import {
  CodeDropsPage,
  DropAndElevatePage,
  GetProfessionalPage,
  NotFoundPage,
  SitemapPage,
  SkilledByDesignPage,
  VibeNMEDLandingPage,
  VibeNMEDPrivacyPage,
  VibeNMEDTermsPage,
} from './routes/lazyPages';

const KNOWN_PATHS = new Set([
  '/',
  '/sitemap',
  '/studio/code-drops',
  '/studio/drop-and-elevate',
  '/studio/get-professional',
  '/studio/skilled-by-design',
  '/vibenmed',
  '/vibenmed/privacy',
  '/vibenmed/terms',
]);

const APP_ROUTES = [
  { path: '/', element: <HomePage /> },
  { path: '/sitemap', element: <SitemapPage /> },
  { path: '/studio/code-drops', element: <CodeDropsPage /> },
  { path: '/studio/drop-and-elevate', element: <DropAndElevatePage /> },
  { path: '/studio/get-professional', element: <GetProfessionalPage /> },
  { path: '/studio/skilled-by-design', element: <SkilledByDesignPage /> },
  { path: '/vibenmed', element: <VibeNMEDLandingPage /> },
  { path: '/vibenmed/privacy', element: <VibeNMEDPrivacyPage /> },
  { path: '/vibenmed/terms', element: <VibeNMEDTermsPage /> },
];

const App = () => {
  const { pathname } = useLocation();
  const normalizedPath = normalizePathname(pathname);

  usePageSeo(KNOWN_PATHS.has(normalizedPath) ? normalizedPath : '*');

  return (
    <ContentGate>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {APP_ROUTES.flatMap(({ path, element }) =>
            path === '/'
              ? [<Route key={path} path={path} element={element} />]
              : [
                  <Route key={path} path={path} element={element} />,
                  <Route key={`${path}/`} path={`${path}/`} element={element} />,
                ],
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ContentGate>
  );
};

export default App;