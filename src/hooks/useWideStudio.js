import { useEffect, useState } from 'react';

const WIDE_STUDIO_QUERY = '(min-width: 768px)';

export const useWideStudio = () => {
  const [isWide, setIsWide] = useState(() => window.matchMedia(WIDE_STUDIO_QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(WIDE_STUDIO_QUERY);
    const update = () => setIsWide(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  return isWide;
};