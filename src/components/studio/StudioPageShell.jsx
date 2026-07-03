import BusinessCardShell from '../BusinessCardShell';
import { useWideStudio } from '../../hooks/useWideStudio';

const StudioPageShell = ({ children, className = '' }) => {
  const isWide = useWideStudio();

  if (isWide) {
    return <div className={`studio-panel ${className}`.trim()}>{children}</div>;
  }

  return <BusinessCardShell className={className}>{children}</BusinessCardShell>;
};

export default StudioPageShell;