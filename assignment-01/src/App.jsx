import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UsersList from './components/UsersList';
import UserDetail from './components/UsersDetail';
import UserPage from './pages/UserPage';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');

    } else {
      root.classList.remove('dark');
    }
    
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <ThemeToggle />

        <header className="bg-blue-600 dark:bg-blue-900 text-white py-6 shadow-lg transition-colors duration-300">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">User Directory</h1>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/users/:id" element={<UserPage />} />
          </Routes>
        </main>

        <UserDetail />
      </div>
    </Router>
  );
}

export default App;
