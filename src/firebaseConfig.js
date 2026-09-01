import { getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'clouddropdesigns.firebaseapp.com',
  projectId: 'clouddropdesigns',
  storageBucket: 'clouddropdesigns.firebasestorage.app',
  messagingSenderId: '415042850938',
  appId: '1:415042850938:web:610ab9dd8de39ac3fc6bc3',
  measurementId: 'G-76G5WWR53H',
  databaseURL: 'https://clouddropdesigns-default-rtdb.firebaseio.com',
};

const initFirebase = async () => {
  if (!firebaseConfig.apiKey) {
    if (import.meta.env.DEV) {
      console.warn('[Firebase] VITE_FIREBASE_API_KEY is not set — analytics disabled.');
    }
    return;
  }

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

  if (typeof window === 'undefined') {
    return;
  }

  try {
    const supported = await isSupported();
    if (supported) {
      getAnalytics(app);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[Firebase Analytics] Failed to initialize.', error);
    }
  }
};

void initFirebase();