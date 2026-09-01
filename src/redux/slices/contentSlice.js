import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllContent as fetchAllContentApi } from '../../api/contentApi';
import { BUNDLED_SITE_CONTENT } from '../../content/bundledSiteContent';

const { meta: bundledMeta, ...bundledSections } = BUNDLED_SITE_CONTENT;

export const fetchAllContent = createAsyncThunk('content/fetchAll', async () => {
  try {
    const data = await fetchAllContentApi();
    return { source: 'live', data };
  } catch {
    return { source: 'bundled', data: BUNDLED_SITE_CONTENT };
  }
});

const applyContent = (state, payload) => {
  const { meta, ...sections } = payload.data;
  state.status = 'succeeded';
  state.error = null;
  state.source = payload.source;
  state.meta = meta ?? state.meta;
  state.sections = {
    ...state.sections,
    ...sections,
  };
};

const initialState = {
  status: 'succeeded',
  error: null,
  source: 'bundled',
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
        state.error = null;
      })
      .addCase(fetchAllContent.fulfilled, (state, action) => {
        applyContent(state, action.payload);
      })
      .addCase(fetchAllContent.rejected, (state) => {
        state.status = 'succeeded';
        state.error = null;
        state.source = 'bundled';
      });
  },
});

export default contentSlice.reducer;
