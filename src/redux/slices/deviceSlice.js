import { createSlice } from '@reduxjs/toolkit';

const deviceSlice = createSlice({
  name: 'device',
  initialState: { type: 'desktop' },
  reducers: {},
});

export const selectDeviceType = (state) => state.device.type;

export default deviceSlice.reducer;
