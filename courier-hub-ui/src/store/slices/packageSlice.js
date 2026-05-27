import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "packages",
  initialState: {
    createPackageData: { loading: false, data: [], error: null, message: null },
    allPackages: { loading: false, data: [], error: null, message: null },
    package: { loading: false, data: [], error: null, message: null },
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
  },
});

export const {
  createPackage,
  setCreatePackage,
  setCreatePackageError,
  fetchPackages,
  setPackages,
  setPackagesError,
} = packageSlice.actions;

export default packageSlice.reducer;
