import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllContent } from '../redux/slices/contentSlice';

const ContentGate = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContent());
  }, [dispatch]);

  return children;
};

export default ContentGate;
