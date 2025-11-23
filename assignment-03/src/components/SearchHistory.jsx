import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Clock } from 'lucide-react';
import { clearHistory } from '../features/history/historySlice';
import { fetchWeather } from '../features/weather/weatherSlice';

const SearchHistory = () => {
  const { cities } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  if (cities.length === 0) return null;

  const handleCityClick = (city) => {
    dispatch(fetchWeather(city));
  };

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Clock size={20} className="text-blue-500" />
          Recent Searches
        </h3>
        <button
          onClick={() => dispatch(clearHistory())}
          className="text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {cities.map((city, index) => (
          <button
            key={index}
            onClick={() => handleCityClick(city)}
            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full transition-colors text-sm font-medium"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};


export default SearchHistory;