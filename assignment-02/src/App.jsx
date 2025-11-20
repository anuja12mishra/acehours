import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchFilter from './components/SearchFilter';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="mx-auto p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Product Inventory Dashboard
          </h2>
        </header>

        <nav className="mb-4 space-x-4 text-blue-600 dark:text-blue-400">
          <Link to="/" className="hover:underline">Products</Link>
          <Link to="/add" className="hover:underline">Add Product</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <SearchFilter />
              <ProductList />
            </>
          }/>
          <Route path="/add" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
