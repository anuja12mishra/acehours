import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersThunk, toggleFavorite } from '../features/usersSlice';

export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { users, favorites } = useSelector((state) => state.users);
  const user = users.find((u) => u.id === parseInt(id));
  const isFavorite = favorites.includes(parseInt(id));

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsersThunk(1));
    }
  }, [dispatch, users.length]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 dark:text-gray-300">User not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        ← Back to List
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt={user.first_name}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg mb-6"
          />
          
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {user.first_name} {user.last_name}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
          
          <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
            User ID: {user.id}
          </p>

          <button
            onClick={() => dispatch(toggleFavorite(user.id))}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              isFavorite
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}
