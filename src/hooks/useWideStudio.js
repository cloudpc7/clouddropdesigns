import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDeviceType } from '../redux/slices/deviceSlice';

const WIDE_STUDIO_QUERY = '(min-width: 768px)';

export const useWideStudio = () => {
  const deviceType = useSelector(selectDeviceType);
  const [isWide, setIsWide] = useState(deviceType !== 'mobile');

  useEffect(() => {
    const media = window.matchMedia(WIDE_STUDIO_QUERY);
    const update = () => setIsWide(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  return isWide;
};