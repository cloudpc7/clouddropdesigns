import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import deviceReducer from './slices/deviceSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    device: deviceReducer,
  },
  preloadedState: typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined,
});
