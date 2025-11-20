import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../feature/products/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
