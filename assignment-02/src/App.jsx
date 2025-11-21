
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchFilter from './components/SearchFilter';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto p-6">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Product Inventory Dashboard
            </h1>
            <nav className="flex gap-4">
              <Link 
                to="/" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                All Products
              </Link>
              <Link 
                to="/add" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Add Product
              </Link>
            </nav>
          </header>

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
      </div>
    </Router>
  );
};


export default App;
