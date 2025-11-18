import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import themeReducer from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    theme: themeReducer,
  },
});
