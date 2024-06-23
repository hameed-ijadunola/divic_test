import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: null,
};

export const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    saveUser: (state, { payload }) => {
      state.user = payload;
    },
    saveToken: (state, { payload }) => {
      state.token = payload;
    },
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    clearUser: state => {
      state.user = {};
    },
    clearToken: state => {
      state.token = null;
    },
    logout: state => {
      state.token = null;
      state.user = {};
    },
    saveToAuth: (state, { payload }) => {
      state[payload[0]] = payload[1];
    },
  },
});

export const {
  saveUser,
  clearUser,
  saveToken,
  clearToken,
  setCredentials,
  logout,
  saveToAuth,
} = authSlice.actions;

export default authSlice.reducer;
