import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsersThunk, toggleFavorite, setSearch } from '../features/usersSlice';

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error, page, totalPages, favorites, search } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersThunk(page));
  }, [dispatch, page]);

  const filteredUsers = users.filter(user => {
    const searchText = `${user.first_name} ${user.last_name} ${user.email}`.toLowerCase();
    return searchText.includes(search.toLowerCase());
  });

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleFavoriteClick = (e, userId) => {
    e.stopPropagation();
    dispatch(toggleFavorite(userId));
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      dispatch(fetchUsersThunk(page + 1));
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(fetchUsersThunk(page - 1));
    }
  };

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Search input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition"
        />
      </div>

      {/* User cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const isFavorite = favorites.includes(user.id);

            return (
              <div
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl dark:shadow-gray-900 transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-105 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center p-6 relative">
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => handleFavoriteClick(e, user.id)}
                    className="absolute top-2 right-2 text-2xl hover:scale-110 transition-transform z-10"
                    aria-label="Toggle favorite"
                  >
                    {isFavorite ? '❤️' : '🤍'}
                  </button>

                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{user.email}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
            No users found matching your search.
          </div>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Previous
        </button>
        
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Page {page} of {totalPages}
        </span>
        
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
