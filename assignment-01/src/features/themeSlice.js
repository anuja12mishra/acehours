import { createSlice } from '@reduxjs/toolkit';

// Load theme from localStorage or default to 'light'
const loadThemeFromStorage = () => {
  try {
    const theme = localStorage.getItem('theme');
    return theme || 'light';
  } catch (error) {
    console.error('Failed to load theme:', error);
    return 'light';
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: loadThemeFromStorage(),
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    },
    setTheme(state, action) {
      state.mode = action.payload;
      localStorage.setItem('theme', state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
