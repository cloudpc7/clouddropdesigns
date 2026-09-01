import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllContent as fetchAllContentApi } from '../../api/contentApi';
import { BUNDLED_SITE_CONTENT } from '../../content/bundledSiteContent';

const { meta: bundledMeta, ...bundledSections } = BUNDLED_SITE_CONTENT;

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
  status: 'idle',
  error: null,
  meta: bundledMeta ?? null,
  sections: {
    siteConfig: null,
    studioNav: null,
    studioPageMeta: null,
    codeDrops: null,
    dropElevate: null,
    getProfessional: null,
    skilledByDesign: null,
    siteSeo: null,
    siteFooter: null,
    siteMap: null,
    vibenmedLegal: null,
    ...bundledSections,
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
        state.error = null;
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
