import '../styles/components/_flipPrompt.scss';

const FlipPrompt = ({ label = 'Tap to view studio' }) => {
  return (
    <div className="flip-prompt" aria-hidden="true">
      <span className="flip-prompt__icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 7h8.5a3.5 3.5 0 1 1 0 7H9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M7 5L5 7l2 2M7 19l-2-2 2-2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 17h-8.5a3.5 3.5 0 0 1 0-7H15"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M17 19l2-2-2-2M17 5l2 2-2 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flip-prompt__label">{label}</span>
    </div>
  );
};

export default FlipPrompt;