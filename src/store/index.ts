// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './features/users/UsersService';
import userReducer from './features/users/userSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
