import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllContent as fetchAllContentApi } from '../../api/contentApi';
import { STATIC_BOOTSTRAP_SECTIONS } from '../../content/staticBootstrap';

export const fetchAllContent = createAsyncThunk(
  'content/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllContentApi();
    } catch (error) {
      return rejectWithValue(error.message ?? 'Failed to load content');
    }
  },
);

const initialState = {
  status: 'succeeded',
  error: null,
  meta: { source: 'static-bootstrap' },
  sections: {
    ...STATIC_BOOTSTRAP_SECTIONS,
  },
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllContent.fulfilled, (state, action) => {
        const { meta, ...sections } = action.payload;
        state.status = 'succeeded';
        state.meta = meta ?? null;
        state.sections = {
          ...state.sections,
          ...sections,
        };
      })
      .addCase(fetchAllContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to load content';
      });
  },
});

export default contentSlice.reducer;