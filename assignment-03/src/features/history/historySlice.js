import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    cities: [],
  },
  reducers: {
    addCityToHistory: (state, action) => {
      const city = action.payload.trim();
      if (city) {
        state.cities = [city, ...state.cities.filter(c => c !== city)].slice(0, 5);
      }
    },
    clearHistory: (state) => {
      state.cities = [];
    },
  },
});

export const { addCityToHistory, clearHistory } = historySlice.actions;

export default historySlice.reducer;