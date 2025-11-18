import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../api/usersApi';

// Load favorites from localStorage
const loadFavoritesFromStorage = () => {
  try {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Failed to load favorites:', error);
    return [];
  }
};

// Save favorites to localStorage
const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
};

export const fetchUsersThunk = createAsyncThunk(
  'users/fetchUsers',
  async (page = 1, thunkAPI) => {
    try {
      const data = await fetchUsers(page);
      console.log('Fetched users data:', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
    selectedUser: null,
    favorites: loadFavoritesFromStorage(), // Load from localStorage
  },
  reducers: {
    selectUser(state, action) {
      state.selectedUser = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    toggleFavorite(state, action) {
      const userId = action.payload;
      const index = state.favorites.indexOf(userId);
      
      if (index > -1) {
        // Remove from favorites
        state.favorites.splice(index, 1);
      } else {
        // Add to favorites
        state.favorites.push(userId);
      }
      
      // Save to localStorage
      saveFavoritesToStorage(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { selectUser, clearSelectedUser, toggleFavorite } = usersSlice.actions;

export default usersSlice.reducer;
