import { useEffect } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

export const useStudioPageScroll = (theme, embed = false) => {
  useEffect(() => {
    if (embed) return undefined;

    const media = window.matchMedia(MOBILE_QUERY);
    const pageBg = theme === 'light' ? '#ebe8e2' : '#141414';
    const { style: htmlStyle } = document.documentElement;
    const { style: bodyStyle } = document.body;

    const apply = () => {
      const shouldLock = media.matches;

      htmlStyle.overflow = shouldLock ? 'hidden' : '';
      htmlStyle.height = shouldLock ? '100%' : '';
      bodyStyle.overflow = shouldLock ? 'hidden' : '';
      bodyStyle.height = shouldLock ? '100%' : '';
      bodyStyle.backgroundColor = shouldLock ? pageBg : '';
    };

    apply();
    media.addEventListener('change', apply);

    return () => {
      media.removeEventListener('change', apply);
      htmlStyle.overflow = '';
      htmlStyle.height = '';
      bodyStyle.overflow = '';
      bodyStyle.height = '';
      bodyStyle.backgroundColor = '';
    };
  }, [theme, embed]);
};