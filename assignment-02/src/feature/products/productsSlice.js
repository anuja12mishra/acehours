import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';
const STORAGE_KEY = 'productInventory';

// Load from localStorage
const loadFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Error loading from localStorage:', err);
    return undefined;
  }
};

// Save to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serialized = JSON.stringify({
      list: state.list,
      search: state.search,
      category: state.category,
      sortBy: state.sortBy,
    });
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
};

// GET all
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const res = await axios.get(`${BASE_URL}?limit=100`);
    return res.data.products;
  }
);

// ADD
export const addProduct = createAsyncThunk(
  'products/add',
  async (product) => {
    const res = await axios.post(`${BASE_URL}/add`, product);
    return res.data;
  }
);

// UPDATE
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
  }
);

// DELETE
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const persistedState = loadFromLocalStorage();

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: persistedState?.list || [],
    loading: false,
    error: null,
    search: persistedState?.search || '',
    category: persistedState?.category || 'all',
    sortBy: persistedState?.sortBy || 'none',
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      saveToLocalStorage(state);
    },
    setCategory(state, action) {
      state.category = action.payload;
      saveToLocalStorage(state);
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      saveToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    // FETCH
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        saveToLocalStorage(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // ADD
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        saveToLocalStorage(state);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // UPDATE
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        saveToLocalStorage(state);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // DELETE
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(p => p.id !== action.payload);
        saveToLocalStorage(state);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearch, setCategory, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;