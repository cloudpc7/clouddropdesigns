import { useEffect, useId, useRef } from 'react';

const TURNSTILE_SCRIPT_ID = 'cloudflare-turnstile-script';
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const loadTurnstileScript = () =>
  new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve(window.turnstile);
      return;
    }

    const existing = document.getElementById(TURNSTILE_SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.turnstile), { once: true });
      existing.addEventListener('error', () => reject(new Error('Turnstile failed to load')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.turnstile);
    script.onerror = () => reject(new Error('Turnstile failed to load'));
    document.head.appendChild(script);
  });

const InquiryTurnstile = ({ siteKey, onTokenChange }) => {
  const containerId = useId().replace(/:/g, '');
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (!siteKey) {
      onTokenChange?.('');
      return undefined;
    }

    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled) {
          return;
        }

        widgetIdRef.current = turnstile.render(`#${containerId}`, {
          sitekey: siteKey,
          theme: 'auto',
          callback: (token) => onTokenChange?.(token),
          'expired-callback': () => onTokenChange?.(''),
          'error-callback': () => onTokenChange?.(''),
        });
      })
      .catch(() => {
        onTokenChange?.('');
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current != null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [containerId, onTokenChange, siteKey]);

  if (!siteKey) {
    return null;
  }

  return <div className="gp-inquiry-turnstile" id={containerId} />;
};

export default InquiryTurnstile;