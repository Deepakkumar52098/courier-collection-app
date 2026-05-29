import { createSlice } from "@reduxjs/toolkit";

const trackingHistorySlice = createSlice({
  name: "trackingHistory",
  initialState: {
    trackingData: { loading: false, data: {}, error: null, message: null },
  },
  reducers: {
    getTrackingHistory(state) {
      state.trackingData.loading = true;
      state.trackingData.data = {};
      state.trackingData.message = null;
      state.trackingData.error = null;
    },
    setTrackingHistory(state, action) {
      state.trackingData.loading = false;
      state.trackingData.data = action.payload.data;
      state.trackingData.message = action.payload.message;
    },
    setTrackingHistoryError(state, action) {
      state.trackingData.loading = false;
      state.trackingData.error = action.payload;
    },
    resetTrackingHistory(state) {
      state.trackingData = {
        loading: false,
        data: {},
        error: null,
        message: null,
      };
    },
  },
});

export const {
  getTrackingHistory,
  setTrackingHistory,
  setTrackingHistoryError,
  resetTrackingHistory,
} = trackingHistorySlice.actions;

export default trackingHistorySlice.reducer;
