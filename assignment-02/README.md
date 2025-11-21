# 📦 Product Inventory Dashboard

A modern, full-featured product inventory management system built with React, Redux Toolkit, and localStorage persistence. Features include real-time search, filtering, sorting, and modal-based CRUD operations.

## ✨ Features

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete products
- 🔍 **Real-time Search** - Instant filtering by product name
- 🏷️ **Category Filtering** - Dynamic category selection
- 🔄 **Multiple Sorting Options** - Sort by price (asc/desc) and name (A-Z)
- 📱 **Modal Forms** - Beautiful modal dialogs for Add/Edit operations
- 💾 **localStorage Persistence** - Data persists across browser sessions
- 🖼️ **Image Preview** - Live preview of product images
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **Redux State Management** - Efficient global state handling
- 📊 **Stock Status Indicators** - Visual stock availability display

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/product-inventory-dashboard.git

# Navigate to project directory
cd product-inventory-dashboard

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

## 📁 Folder Structure

```
product-inventory-dashboard/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── app/
│   │   └── store.js                 # Redux store configuration
│   ├── components/
│   │   ├── LoadingSpinner.jsx       # Loading indicator component
│   │   ├── ProductForm.jsx          # Modal form for Add/Edit
│   │   ├── ProductList.jsx          # Product grid display
│   │   └── SearchFilter.jsx         # Search, filter, and sort controls
│   ├── feature/
│   │   └── products/
│   │       └── productsSlice.js     # Redux slice with async thunks
│   ├── App.jsx                      # Main application component
│   ├── index.js                     # Application entry point
│   ├── index.css                    # Global styles and Tailwind imports
│   └── utils/
│       └── localStorage.js          # localStorage helper functions
├── package.json
├── tailwind.config.js
├── README.md
└── .gitignore
```

### 📂 Detailed File Descriptions

#### **`src/app/store.js`**
Redux store configuration with products reducer.

#### **`src/feature/products/productsSlice.js`**
- Redux slice managing product state
- Async thunks for API operations
- localStorage integration
- Reducers for search, filter, and sort

#### **`src/components/ProductForm.jsx`**
- Modal component for adding/editing products
- Form validation
- Image URL preview
- Handles both create and update operations

#### **`src/components/ProductList.jsx`**
- Displays products in responsive grid
- Manages modal state
- Delete confirmation dialog
- Integration with ProductForm modal

#### **`src/components/SearchFilter.jsx`**
- Search input for filtering by name
- Category dropdown (dynamically populated)
- Sort dropdown (price and name options)

#### **`src/components/LoadingSpinner.jsx`**
- Reusable loading indicator
- Displayed during async operations

## 🔌 API Usage

### Base URL
```javascript
const BASE_URL = 'https://dummyjson.com/products';
```

### Available Endpoints

#### 1. **Fetch All Products**
```javascript
GET /products?limit=100
```
**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "iPhone 14 Pro",
      "price": 999,
      "stock": 45,
      "category": "smartphones",
      "description": "Latest iPhone...",
      "thumbnail": "https://...",
      "brand": "Apple",
      "rating": 4.8
    }
  ]
}
```

#### 2. **Add Product**
```javascript
POST /products/add
Content-Type: application/json

{
  "title": "New Product",
  "price": 599,
  "stock": 30,
  "category": "electronics",
  "description": "Product description",
  "thumbnail": "https://...",
  "brand": "BrandName",
  "rating": 4.5
}
```

#### 3. **Update Product**
```javascript
PUT /products/{id}
Content-Type: application/json

{
  "title": "Updated Product",
  "price": 699,
  "stock": 25
}
```

#### 4. **Delete Product**
```javascript
DELETE /products/{id}
```

### Redux Async Thunks

#### **fetchProducts**
```javascript
import { fetchProducts } from './feature/products/productsSlice';

dispatch(fetchProducts());
```

#### **addProduct**
```javascript
import { addProduct } from './feature/products/productsSlice';

const newProduct = {
  title: 'MacBook Pro',
  price: 2499,
  stock: 20,
  category: 'laptops',
  description: 'Powerful laptop',
  thumbnail: 'https://...',
  brand: 'Apple',
  rating: 4.9
};

dispatch(addProduct(newProduct));
```

#### **updateProduct**
```javascript
import { updateProduct } from './feature/products/productsSlice';

dispatch(updateProduct({
  id: 1,
  data: {
    title: 'Updated Title',
    price: 899,
    stock: 50
  }
}));
```

#### **deleteProduct**
```javascript
import { deleteProduct } from './feature/products/productsSlice';

dispatch(deleteProduct(1));
```

## 🎯 State Management

### Redux State Structure

```javascript
{
  products: {
    list: [],           // Array of product objects
    loading: false,     // Loading state for async operations
    error: null,        // Error message if operation fails
    search: '',         // Current search query
    category: 'all',    // Selected category filter
    sortBy: 'none'      // Current sort option
  }
}
```

### Available Actions

```javascript
// Sync actions
setSearch(query)        // Update search filter
setCategory(category)   // Update category filter
setSortBy(option)       // Update sort option

// Async actions (thunks)
fetchProducts()         // Fetch all products from API
addProduct(product)     // Add new product
updateProduct({id, data}) // Update existing product
deleteProduct(id)       // Delete product
```



## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm install -g serve
serve -s build
```
