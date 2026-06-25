import VibeNMEDLayout from './VibeNMEDLayout';
import '../../styles/components/_vibenmedLegal.scss';

const VibeNMEDLegalDocument = ({ title, html }) => {
  return (
    <VibeNMEDLayout>
      <article className="vibenmed-legal">
        <div className="vibenmed-legal__card">
          <div
            className="vibenmed-legal__content"
            data-custom-class="body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>
    </VibeNMEDLayout>
  );
};

export default VibeNMEDLegalDocument;