import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllContent } from '../redux/slices/contentSlice';
import { useContentError, useContentReady, useContentStatus } from '../hooks/useContent';

const ContentGate = ({ children }) => {
  const dispatch = useDispatch();
  const status = useContentStatus();
  const error = useContentError();
  const ready = useContentReady();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllContent());
    }
  }, [dispatch, status]);

  if (ready) {
    return children;
  }

  if (status === 'failed') {
    return (
      <div className="content-gate content-gate--error" role="alert">
        <p>Unable to load site content.</p>
        {error ? <p className="content-gate__detail">{error}</p> : null}
        <button type="button" onClick={() => dispatch(fetchAllContent())}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="content-gate content-gate--loading" role="status" aria-live="polite">
      <p>Loading…</p>
    </div>
  );
};

export default ContentGate;