import { Cloud, Droplets, Eye, Gauge, MapPin, Wind } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

const WeatherDisplay = () => {
  const { data, loading, error } = useSelector((state) => state.weather);

  // Helper function to parse coordinates
  const parseCoordinate = (coord) => {
    if (!coord) return '0.0000';
    const coordStr = String(coord);
    const numStr = coordStr.replace(/[NSEW]/g, '');
    const num = parseFloat(numStr);
    return isNaN(num) ? '0.0000' : num.toFixed(4);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-gray-600 text-lg">Fetching weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-red-700 text-lg font-medium">{error}</p>
        <p className="text-red-600 text-sm mt-2">Please try searching for another city</p>
      </div>
    );
  }

  if (!data || !data.lat) {
    return (
      <div className="text-center py-20">
        <Cloud size={80} className="mx-auto text-gray-300 mb-6" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to Weather Dashboard</h3>
        <p className="text-gray-500 text-lg">Search for a city to see current weather conditions</p>
      </div>
    );
  }

  const { current } = data;
  const unitLabels = {
    us: { temp: 'Fahrenheit', speed: 'mph', distance: 'mi' },
    uk: { temp: 'Celsius', speed: 'mph', distance: 'mi' },
    metric: { temp: 'Celsius', speed: 'm/s', distance: 'km' },
    ca: { temp: 'Celsius', speed: 'km/h', distance: 'km' },
  };
  const units = unitLabels[data.units] || unitLabels.metric;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">{data.place_name || 'Location'}</h2>
            <p className="text-blue-100 text-lg flex items-center gap-2">
              <MapPin size={18} />
              {data.lat} {data.lon}
            </p>
            {data.timezone && (
              <p className="text-blue-200 text-sm mt-1">{data.timezone}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-6xl md:text-7xl font-bold">
              {Math.round(current.temperature)}°
            </div>
            <div className="text-blue-100 text-lg mt-1">{units.temp}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
          <Cloud size={32} />
          <span className="text-xl md:text-2xl font-medium capitalize">{current.summary || 'Clear'}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={20} className="text-blue-200" />
              <span className="text-sm text-blue-100">Humidity</span>
            </div>
            <div className="text-2xl font-bold">{current.humidity || 0}%</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind size={20} className="text-blue-200" />
              <span className="text-sm text-blue-100">Wind</span>
            </div>
            <div className="text-2xl font-bold">
              {current.wind?.speed || 0} {units.speed}
            </div>
            {current.wind?.dir && (
              <div className="text-xs text-blue-200 mt-1">{current.wind.dir}</div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={20} className="text-blue-200" />
              <span className="text-sm text-blue-100">Visibility</span>
            </div>
            <div className="text-2xl font-bold">{current.visibility?.toFixed(1) || 0} {units.distance}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gauge size={20} className="text-blue-200" />
              <span className="text-sm text-blue-100">Feels Like</span>
            </div>
            <div className="text-2xl font-bold">{Math.round(current.feels_like || current.temperature)}°</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-sm text-blue-100 mb-1">Pressure</div>
            <div className="text-lg font-bold">{current.pressure || 0} hPa</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-sm text-blue-100 mb-1">Cloud Cover</div>
            <div className="text-lg font-bold">{current.cloud_cover || 0}%</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-sm text-blue-100 mb-1">UV Index</div>
            <div className="text-lg font-bold">{current.uv_index?.toFixed(1) || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default WeatherDisplay;
