import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("EmployeConnect-user")
    ? JSON.parse(localStorage.getItem("EmployeConnect-user"))
    : null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;

export default profileSlice.reducer;
