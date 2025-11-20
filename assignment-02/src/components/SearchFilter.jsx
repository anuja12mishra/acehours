import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setCategory, setSortBy } from '../feature/products/productsSlice';

const SearchFilter = () => {
  const dispatch = useDispatch();
  const { search, category, sortBy } = useSelector((state) => state.products);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="border p-2 rounded w-full"
      />

      <select
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="border p-2 rounded w-full md:w-48"
      >
        <option value="all">All Categories</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
        className="border p-2 rounded w-full md:w-48"
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
