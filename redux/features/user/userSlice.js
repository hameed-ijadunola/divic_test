import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pushToken: '',
  initialLoad: true,
};

export const userSlice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    saveToStore: (state, { payload }) => {
      state[payload[0]] = payload[1];
    },
    clearUserDetails: (state, { payload }) => {
      state = {};
    },
  },
});

export const { saveToStore, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
