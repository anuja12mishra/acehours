import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, setEditingProduct } from '../feature/products/productsSlice';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error, search, category, sortBy } = useSelector(
    (state) => state.products
  );

  const handleEdit = (product) => {
    navigate(`/edit/${product.id}`);
  };

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
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {sorted.map((p) => (
        <div
          key={p.id}
          className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center"
        >
          <img
            src={p.thumbnail}
            alt={p.title}
            className="w-32 h-32 object-cover rounded mb-3"
          />

          <h4 className="text-lg font-semibold">{p.title}</h4>
          <p className="text-gray-700 font-medium">₹ {p.price}</p>

          <p className={`text-sm font-semibold mt-1 ${p.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleEdit(p)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteProduct(p.id))}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
