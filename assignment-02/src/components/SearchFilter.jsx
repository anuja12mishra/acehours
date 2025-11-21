import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setCategory, setSortBy } from '../feature/products/productsSlice';

const SearchFilter = () => {
  const dispatch = useDispatch();
  const { search, category, sortBy, list } = useSelector((state) => state.products);

  const categories = ['all', ...new Set(list.map(p => p.category))];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="border border-gray-300 p-3 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="border border-gray-300 p-3 rounded-lg w-full md:w-56 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
        className="border border-gray-300 p-3 rounded-lg w-full md:w-48 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="none">No Sorting</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="name-asc">Name A-Z</option>
      </select>
    </div>
  );
};

export default SearchFilter;