import { useEffect } from 'react';
import ProjectStartInquiryForm from './ProjectStartInquiryForm';
import '../../styles/pages/_getProfessional.scss';

const ProjectStartInquiryModal = ({
  open,
  onClose,
  initialProjectType = '',
  serviceLabel = '',
  serviceDescription = '',
}) => {
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="gp-inquiry-modal" role="presentation">
      <button
        type="button"
        className="gp-inquiry-modal__backdrop"
        aria-label="Close project inquiry form"
        onClick={onClose}
      />
      <div
        className="gp-inquiry-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gp-inquiry-title"
      >
        <button
          type="button"
          className="gp-inquiry-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <ProjectStartInquiryForm
          initialProjectType={initialProjectType}
          serviceLabel={serviceLabel}
          serviceDescription={serviceDescription}
        />
      </div>
    </div>
  );
};

export default ProjectStartInquiryModal;