import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
// ** Types
import { Users } from './type';



const initialState = {
  users: [],
} as Users;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAllUser(state, { payload }) {
      const data:any  = payload;
      state.users = data;

    },
  },
});

export default userSlice.reducer;
export const { getAllUser} = userSlice.actions;
