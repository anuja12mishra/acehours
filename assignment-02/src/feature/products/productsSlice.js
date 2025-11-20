import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

// GET all
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const res = await axios.get(`${BASE_URL}?limit=100`);
    return res.data.products;       // array
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
    return id; // return id so we can remove locally
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: false,
    error: null,
    search: '',
    category: 'all',
    sortBy: 'none', // 'price-asc' | 'price-desc' | 'name-asc'
    editingProduct: null, // for edit form/modal
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
    setEditingProduct(state, action) {
      state.editingProduct = action.payload;
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
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSearch,
  setCategory,
  setSortBy,
  setEditingProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
