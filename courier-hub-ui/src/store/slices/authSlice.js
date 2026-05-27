import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginDetails: {
      loading: false,
      message: null,
      error: null,
      user: localStorage.getItem("user") || null,
      token: localStorage.getItem("token") || null,
    },
  },
  reducers: {
    fetchLogin(state) {
      state.loginDetails.loading = true;
      state.loginDetails.error = null;
      state.loginDetails.message = null;
    },
    setLogin(state, action) {
      state.loginDetails.loading = false;
      state.loginDetails.user = action.payload.user;
      state.loginDetails.message = action.payload.message;
      state.loginDetails.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    setLoginError(state, action) {
      state.loginDetails.loading = false;
      state.loginDetails.error = action.payload;
    },
    resetLoginDetails(state) {
      state.loginDetails = {
        loading: false,
        error: null,
        message: null,
        user: null,
        token: null,
      };
      localStorage.removeItem("token");
    },
  },
});

export const { fetchLogin, setLogin, setLoginError, resetLoginDetails } =
  authSlice.actions;

export default authSlice.reducer;
