import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../feature/products/productsSlice';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error, search, category, sortBy } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = list
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === 'all' ? true : p.category === category));

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
    return 0;
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {sorted.map((p) => (
        <div
          key={p.id}
          className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-between hover:shadow-xl transition-shadow"
        >
          <img
            src={p.thumbnail}
            alt={p.title}
            className="w-32 h-32 object-cover rounded mb-3"
          />

          <h4 className="text-lg font-semibold text-gray-800 text-center mb-1">{p.title}</h4>
          <p className="text-gray-900 font-bold text-xl">₹ {p.price}</p>

          <p className={`text-sm font-semibold mt-2 ${p.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate(`/edit/${p.id}`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 font-medium transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteProduct(p.id))}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
