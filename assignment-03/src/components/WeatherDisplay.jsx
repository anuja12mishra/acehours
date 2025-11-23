import { Cloud, Droplets, Eye, Gauge, MapPin, Wind } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

// Reusable metric card component
const MetricCard = ({ icon: Icon, label, value, unit, extra }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon size={20} className="text-blue-200" aria-label={label} />
      <span className="text-sm text-blue-100">{label}</span>
    </div>
    <div className="text-2xl font-bold">
      {value}{unit ? ` ${unit}` : ''}
    </div>
    {extra && <div className="text-xs text-blue-200 mt-1">{extra}</div>}
  </div>
);

const WeatherDisplay = () => {
  const { data, loading, error } = useSelector((state) => state.weather);

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

  // Simplified unit labels
  const unitLabels = {
    us: { temp: '°F', speed: 'mph', distance: 'mi' },
    uk: { temp: '°C', speed: 'mph', distance: 'mi' },
    metric: { temp: '°C', speed: 'm/s', distance: 'km' },
    ca: { temp: '°C', speed: 'km/h', distance: 'km' },
  };
  const units = unitLabels[data.units] || unitLabels.metric;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">{data.place_name || 'Location'}</h2>
            <p className="text-blue-100 text-lg flex items-center gap-2">
              <MapPin size={18} /> {data.lat}, {data.lon}
            </p>
            {data.timezone && (
              <p className="text-blue-200 text-sm mt-1">{data.timezone}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-6xl md:text-7xl font-bold">
              {Math.round(current.temperature)}{units.temp}
            </div>
            <div className="text-blue-100 text-lg mt-1">Temperature</div>
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
          <Cloud size={32} aria-label="Weather condition" />
          <span className="text-xl md:text-2xl font-medium capitalize">
            {current.summary || 'Clear'}
          </span>
        </div>

        {/* Main metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon={Droplets} label="Humidity" value={`${current.humidity || 0}%`} />
          <MetricCard icon={Wind} label="Wind" value={current.wind?.speed || 0} unit={units.speed} extra={current.wind?.dir} />
          <MetricCard icon={Eye} label="Visibility" value={typeof current.visibility === 'number' ? current.visibility.toFixed(1) : 0} unit={units.distance} />
          <MetricCard icon={Gauge} label="Feels Like" value={Math.round(current.feels_like || current.temperature)} unit={units.temp} />
        </div>

        {/* Extra metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <MetricCard icon={Gauge} label="Pressure" value={current.pressure || 0} unit="hPa" />
          <MetricCard icon={Cloud} label="Cloud Cover" value={`${current.cloud_cover || 0}%`} />
          <MetricCard icon={Eye} label="UV Index" value={typeof current.uv_index === 'number' ? current.uv_index.toFixed(1) : 0} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;