// src/redux/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    LoginCode: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoginCode: (state, action) => {
      state.LoginCode = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.LoginCode = null;
    },
  },
});

export const { setToken, clearToken,setLoginCode } = authSlice.actions;
export default authSlice.reducer;
