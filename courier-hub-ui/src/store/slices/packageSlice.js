import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "packages",
  initialState: {
    createPackageData: { loading: false, data: {}, error: null, message: null },
    allPackages: { loading: false, data: [], error: null, message: null },
    package: { loading: false, data: [], error: null, message: null },
    dashboardData: { loading: false, data: {}, error: null, message: null },
  },
  reducers: {
    createPackage(state) {
      state.createPackageData.loading = true;
      state.createPackageData.data = [];
      state.createPackageData.message = null;
      state.createPackageData.error = null;
    },
    setCreatePackage(state, action) {
      state.createPackageData.loading = false;
      state.createPackageData.data = action.payload.data;
      state.createPackageData.message = action.payload.message;
    },
    setCreatePackageError(state, action) {
      state.createPackageData.loading = false;
      state.createPackageData.error = action.payload;
    },
    fetchPackages(state) {
      state.allPackages.loading = true;
      state.allPackages.data = [];
      state.allPackages.message = null;
      state.allPackages.error = null;
    },
    setPackages(state, action) {
      state.allPackages.loading = false;
      state.allPackages.data = action.payload.data;
      state.allPackages.message = action.payload.message;
    },
    setPackagesError(state, action) {
      state.allPackages.loading = false;
      state.allPackages.error = action.payload;
    },
    fetchDashboardData(state) {
      state.dashboardData.loading = true;
      state.dashboardData.data = {};
      state.dashboardData.message = null;
      state.dashboardData.error = null;
    },
    setDashboardData(state, action) {
      state.dashboardData.loading = false;
      state.dashboardData.data = action.payload.data;
      state.dashboardData.message = action.payload.message;
    },
    setDashboardError(state, action) {
      state.dashboardData.loading = false;
      state.dashboardData.error = action.payload;
    },
    resetCreatePackage(state) {
      state.createPackageData = {
        loading: false,
        data: {},
        error: null,
        message: null,
      };
    },
  },
});

export const {
  createPackage,
  setCreatePackage,
  setCreatePackageError,
  fetchPackages,
  setPackages,
  setPackagesError,
  fetchDashboardData,
  setDashboardData,
  setDashboardError,
  resetCreatePackage,
} = packageSlice.actions;

export default packageSlice.reducer;
