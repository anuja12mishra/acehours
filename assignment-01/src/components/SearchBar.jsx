import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../features/usersSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.users.search);

  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="mb-8 mt-4 flex justify-center">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search by name or email"
        className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition"
      />
    </div>
  );
}
