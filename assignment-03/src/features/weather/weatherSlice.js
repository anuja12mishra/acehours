
import {  createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cloud, Search, MapPin, Droplets, Wind, Eye, Gauge, Clock, X } from 'lucide-react';

const rapidApiKey = 'aa12c22f35msh1509b1a8262ac3bp17aef2jsn251e3b67603f';

// City search suggestions
export const fetchCitySuggestions = createAsyncThunk(
  'weather/fetchCitySuggestions',
  async (query) => {
    if (query.length < 2) return [];
    const response = await fetch(
      `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${encodeURIComponent(query)}&language=en`,
      {
        headers: {
          'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com',
          'x-rapidapi-key': rapidApiKey,
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch suggestions');
    const data = await response.json();
    return data || [];
  }
);

// Weather data fetch - Current weather
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    const response = await fetch(
      `https://ai-weather-by-meteosource.p.rapidapi.com/current?place_id=${encodeURIComponent(city)}&timezone=auto&language=en&units=auto`,
      {
        headers: {
          'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com',
          'x-rapidapi-key': rapidApiKey,
        },
      }
    );
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    return data;
  }
);

// Weather Slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    loading: false,
    error: null,
    suggestions: [],
    suggestionsLoading: false,
  },
  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCitySuggestions.pending, (state) => {
        state.suggestionsLoading = true;
      })
      .addCase(fetchCitySuggestions.fulfilled, (state, action) => {
        state.suggestionsLoading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchCitySuggestions.rejected, (state) => {
        state.suggestionsLoading = false;
        state.suggestions = [];
      });
  },
});


export const { clearSuggestions } = weatherSlice.actions;

export default weatherSlice.reducer;