
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

// Async Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const res = await axios.get(`${BASE_URL}`);
    return res.data.products;
  }
);

export const addProduct = createAsyncThunk(
  'products/add',
  async (product) => {
    // console.log(product);
    const res = await axios.post(`${BASE_URL}/add`, product);
    // console.log(res.data);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: false,
    error: null,
    search: '',
    category: 'all',
    sortBy: 'none',
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.list.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
      });
  },
});

export const { setSearch, setCategory, setSortBy } = productsSlice.actions;

export default productsSlice.reducer;
