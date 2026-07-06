import namerrsTablet from '../assets/namerrs/namerrs-tablet.png';
import entertainmentScreen from '../assets/entertainment/screenshot.png';
import sonoraTiresMobile from '../assets/sonoratiresinc/mobile.png';
import hemetvalleyLogo from '../assets/hemetvalley/logo.png';
import hemetvalleyMobile from '../assets/hemetvalley/mobile.png';
import vibenmedScreen from '../assets/vibenmed/loginscreen.png';
import vibenmedIcon from '../assets/vibenmed/icon.png';

export const CODE_DROPS_PROJECTS = [
  {
    id: 'vibenmed',
    name: 'VibeNMED',
    tagline: 'Healthcare networking for students, preceptors, and educators',
    category: 'Mobile Application',
    image: vibenmedScreen,
    thumb: vibenmedIcon,
    href: '/vibenmed',
    accent: '#2bb8c6',
  },
  {
    id: 'hemetvalleytools',
    name: 'Hemet Valley Tools',
    tagline: 'Power tool rentals, repairs, and supply for contractors and DIY',
    category: 'Web Application',
    image: hemetvalleyMobile,
    thumb: hemetvalleyLogo,
    mobileImage: hemetvalleyMobile,
    href: 'https://hemetvalleytools.web.app',
    accent: '#f59e0b',
    brandPresentation: true,
  },
  {
    id: 'entertainment-web-app',
    name: 'Entertainment Web App',
    tagline: 'Search, browse, and bookmark movies and TV series',
    category: 'Web Application',
    image: entertainmentScreen,
    thumb: entertainmentScreen,
    href: 'https://entertainmentwebapp-444922.web.app',
    accent: '#e50914',
    screenshotPresentation: true,
    imagePosition: 'top center',
    imageBackdrop: '#10101c',
  },
  {
    id: 'sonoratiresinc',
    name: 'Sonora Tires Inc',
    tagline: 'Find, compare, and inquire about tires for your vehicle',
    category: 'Web Application',
    image: sonoraTiresMobile,
    thumb: sonoraTiresMobile,
    href: 'https://sonoratiresinc.web.app',
    accent: '#e8a23a',
  },
  {
    id: 'namerrs',
    name: 'NAMERRS',
    tagline: 'Custom graphic design, apparel, and printed products',
    category: 'Web Application',
    image: namerrsTablet,
    thumb: namerrsTablet,
    href: 'https://namerrs.web.app',
    inProgress: false,
    accent: '#7c3aed',
    screenshotPresentation: true,
    imagePosition: 'top center',
  },
];