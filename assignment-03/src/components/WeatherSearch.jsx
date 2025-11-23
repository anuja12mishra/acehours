
import { useDispatch, useSelector } from 'react-redux';
import { Search, MapPin, X } from 'lucide-react';
import { fetchWeather, fetchCitySuggestions, clearSuggestions } from '../features/weather/weatherSlice';
import { addCityToHistory } from '../features/history/historySlice';
import { useEffect, useRef, useState } from 'react';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const { suggestions, suggestionsLoading } = useSelector((state) => state.weather);
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setShowSuggestions(true);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (value.trim().length >= 2) {
        dispatch(fetchCitySuggestions(value.trim()));
      } else {
        dispatch(clearSuggestions());
      }
    }, 300);
  };

  const handleSearch = () => {
    if (city.trim()) {
      dispatch(fetchWeather(city.trim()));
      dispatch(addCityToHistory(city.trim()));
      setShowSuggestions(false);
      dispatch(clearSuggestions());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = suggestion.name;
    const placeId = suggestion.place_id;
    setCity(cityName);
    dispatch(fetchWeather(placeId));
    dispatch(addCityToHistory(cityName));
    setShowSuggestions(false);
    dispatch(clearSuggestions());
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => city.length >= 2 && setShowSuggestions(true)}
            className="w-full px-6 py-4 pr-24 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all shadow-sm"
          />
          {city && (
            <button
              type="button"
              onClick={() => {
                setCity('');
                dispatch(clearSuggestions());
              }}
              className="absolute right-20 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="absolute right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl max-h-80 overflow-y-auto">
          {suggestionsLoading && (
            <div className="px-6 py-4 text-gray-500">Loading suggestions...</div>
          )}
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-6 py-4 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3"
            >
              <MapPin size={18} className="text-blue-500 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-800">{suggestion.name}</div>
                <div className="text-sm text-gray-500">
                  {suggestion.adm_area1 && `${suggestion.adm_area1}, `}{suggestion.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default WeatherSearch;
