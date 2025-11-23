import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';
import SearchHistory from './components/SearchHistory';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Weather Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Get real-time weather information for any city</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <WeatherSearch />
          <WeatherDisplay />
          <SearchHistory />
        </div>

        <footer className="text-center mt-16 text-sm text-gray-500">
          <p>Powered by RapidAPI Weather Service</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
