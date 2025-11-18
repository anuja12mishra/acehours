import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedUser } from '../features/usersSlice';

export default function UserDetail() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.selectedUser);

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-fade-in border border-gray-200 dark:border-gray-700">
        {/* Close Button */}
        <button
          onClick={() => dispatch(clearSelectedUser())}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* User Avatar */}
        <div className="flex justify-center mb-4">
          <img
            src={user.avatar}
            alt={user.first_name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            <span className="font-semibold">ID:</span> {user.id}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={() => dispatch(clearSelectedUser())}
            className="w-full px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
