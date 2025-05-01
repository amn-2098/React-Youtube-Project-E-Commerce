// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    token: ''
  },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.name;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.userName = '';
      state.token = '';
    }
  }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
