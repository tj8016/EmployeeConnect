import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  sidebar: false,
  signupData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setStep, setSidebar, setSignupData, setLoading, setToken } =
  authSlice.actions;

export default authSlice.reducer;
