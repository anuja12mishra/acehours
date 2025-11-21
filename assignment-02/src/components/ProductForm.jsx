import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addProduct, updateProduct, fetchProducts } from '../feature/products/productsSlice';
import LoadingSpinner from './LoadingSpinner';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useSelector(state => state.products.list);
  const loading = useSelector(state => state.products.loading);
  const dispatch = useDispatch();

  const emptyForm = {
    title: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    thumbnail: '',
    brand: '',
    rating: ''
  };

  const [form, setForm] = useState(emptyForm);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Fetch products if list is empty
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Load product data when editing
  useEffect(() => {
    if (id && products.length > 0) {
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        setForm({
          title: product.title || '',
          price: product.price || '',
          stock: product.stock || '',
          category: product.category || '',
          description: product.description || '',
          thumbnail: product.thumbnail || '',
          brand: product.brand || '',
          rating: product.rating || ''
        });
        setIsDataLoaded(true);
      }
    } else if (!id) {
      setForm(emptyForm);
      setIsDataLoaded(true);
    }
  }, [id, products]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating)
    };
    if (id) {
      dispatch(updateProduct({ id: parseInt(id), data }));
    } else {
      dispatch(addProduct(data));
    }
    navigate('/');
  };

  // Show loading spinner while fetching data for edit
  if (id && (!isDataLoaded || loading)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        {id ? 'Edit Product' : 'Add New Product'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
          <input
            name="title"
            placeholder="Enter product name"
            value={form.title}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Enter price"
            value={form.price}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
          <input
            name="stock"
            type="number"
            placeholder="Enter stock quantity"
            value={form.stock}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <input
            name="category"
            placeholder="Enter category"
            value={form.category}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
          <input
            name="brand"
            placeholder="Enter brand name"
            value={form.brand}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <input
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="Enter rating (0-5)"
            value={form.rating}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
          <input
            name="thumbnail"
            placeholder="Enter image URL"
            value={form.thumbnail}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.thumbnail && (
            <div className="mt-4 flex justify-center">
              <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                <p className="text-sm text-gray-600 mb-2 text-center font-medium">Image Preview</p>
                <img
                  src={form.thumbnail}
                  alt="Product preview"
                  className="w-48 h-48 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden text-red-600 text-sm text-center p-4">
                  Invalid image URL
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            className="border border-gray-300 p-3 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button 
          type="button"
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {id ? 'Update Product' : 'Add Product'}
        </button>
        <button 
          type="button"
          onClick={() => navigate('/')}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductForm;