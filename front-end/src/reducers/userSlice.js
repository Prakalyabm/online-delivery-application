import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: JSON.parse(localStorage.getItem('user')) || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
