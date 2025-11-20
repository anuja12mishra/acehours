import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addProduct, updateProduct } from '../feature/products/productsSlice';

const emptyForm = { title: '', price: '', stock: '', category: '', description: '', thumbnail: '' };

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useSelector(state => state.products.list);
  const [form, setForm] = useState(emptyForm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const product = products.find(p => p.id === parseInt(id));
      if (product) setForm(product);
      else setForm(emptyForm); // or show "product not found"
    } else {
      setForm(emptyForm);
    }
  }, [id, products]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), stock: Number(form.stock) };
    if (id) {
      dispatch(updateProduct({ id: parseInt(id), data }));
    } else {
      dispatch(addProduct(data));
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-900 dark:text-gray-100">
      <h3 className="col-span-2 text-xl font-semibold mb-4">
        {id ? 'Edit Product' : 'Add New Product'}
      </h3>
      {/* input elements here styled with Tailwind */}
      {/* example for title */}
      <input
        name="title"
        placeholder="Product name"
        value={form.title}
        onChange={handleChange}
        required
        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700"
      />
      {/* add other inputs similarly */}
      <button type="submit" className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        {id ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default ProductForm;
