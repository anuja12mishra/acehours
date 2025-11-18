📱 User Directory Dashboard
A modern, production-ready user directory application built with React, Redux Toolkit, React Router, and Tailwind CSS v4. This project demonstrates state management, API integration, routing, and advanced features like favorites and theme switching.

✨ Features
Core Requirements
✅ API Integration - Fetch paginated user data from ReqRes API

✅ User List Display - Show user photo, name, and email in grid layout

✅ Pagination - Previous/Next controls with page indicators

✅ User Detail View - Modal with detailed user information

✅ Search/Filter - Filter users by name or email

✅ Loading States - Animated spinner during data fetch

✅ Error Handling - User-friendly error messages

Redux Implementation
✅ Redux Toolkit - Modern Redux with createSlice and createAsyncThunk

✅ State Management - Users list, selected user, loading, error, pagination

✅ Async Thunks - API calls with proper loading/error handling

✅ Actions - Fetch users, select user, toggle favorites

Bonus Features
⭐ Favorites with localStorage - Mark/unmark users as favorites (persists across sessions)

⭐ Dark/Light Theme Toggle - Redux-managed theme with localStorage persistence

⭐ React Router - Individual user pages at /users/:id

Additional Enhancements
📱 Fully Responsive - Mobile-first design, works on all devices

🎨 Modern UI/UX - Clean design with smooth animations and transitions

♿ Accessible - ARIA labels, keyboard navigation, focus states

⚡ Optimized Performance - Efficient state updates and component rendering

🌙 System Theme Detection - Respects user's OS theme preference

🏗️ Folder Structure
text
user-directory-app/
│
├── public/                     # Public assets
│
├── src/                        # Source code
│   │
│   ├── api/                    # API service layer
│   │   └── usersApi.js        # User API calls (fetch users)
│   │
│   ├── app/                    # Redux store configuration
│   │   └── store.js           # Redux store setup with combined reducers
│   │
│   ├── features/               # Redux slices (feature-based organization)
│   │   ├── usersSlice.js      # Users state: list, pagination, selected, favorites
│   │   └── themeSlice.js      # Theme state: light/dark mode
│   │
│   ├── components/             # React components
│   │   ├── UsersList.js       # Main user list with grid layout & pagination
│   │   ├── UsersDetail.js     # User detail modal (overlay)
│   │   ├── UserPage.js        # Individual user page (React Router)
│   │   └── ThemeToggle.js     # Theme toggle button (sun/moon icons)
│   │
│   ├── App.jsx                 # Main app component (routes, theme logic)
│   ├── main.jsx               # Entry point (renders app to DOM)
│   └── index.css              # Global styles, Tailwind imports, animations
│
├── .gitignore                  # Git ignore rules
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── vite.config.js             # Vite build configuration
└── README.md                  # This file
📋 Detailed File Descriptions
API Layer
text
src/api/usersApi.js
Handles all API calls to ReqRes API

Exports fetchUsers(page) function

Returns JSON response with user data

Redux Store
text
src/app/store.js
Configures Redux store using configureStore

Combines usersReducer and themeReducer

Enables Redux DevTools for debugging

Redux Slices
src/features/usersSlice.js
State:

users - Array of user objects from API

page - Current page number (default: 1)

totalPages - Total available pages

loading - Boolean for loading state

error - Error message string (null if no error)

selectedUser - Currently selected user object for modal

favorites - Array of favorite user IDs (persists in localStorage)

Actions:

fetchUsersThunk - Async thunk to fetch users from API

selectUser - Set selected user for modal

clearSelectedUser - Clear selected user (close modal)

toggleFavorite - Add/remove user from favorites

Extra Reducers:

pending - Set loading to true

fulfilled - Update users, page, totalPages

rejected - Set error message

src/features/themeSlice.js
State:

mode - 'light' or 'dark' (loads from localStorage)

Actions:

toggleTheme - Switch between light/dark mode

setTheme - Set specific theme mode

Components
src/components/UsersList.js
Displays users in responsive grid (1/2/3 columns)

Shows user avatar, name, email

Favorite button on each card

Handles pagination (Previous/Next buttons)

Loading spinner and error states

Navigates to user detail page on click

src/components/UsersDetail.js
Modal overlay with user details

Shows enlarged avatar and full info

Close button (X icon) and footer button

Dark mode support

Fade-in animation

src/components/UserPage.js
Individual user page (React Router)

Accessible at /users/:id

Shows user info with add/remove favorite button

Back to list navigation

Handles user not found case

src/components/ThemeToggle.js
Fixed position button (top-right corner)

Moon icon for light mode, Sun icon for dark mode

Dispatches toggleTheme action

Smooth icon transitions

Main Files
src/App.jsx
Main application component

Sets up React Router with routes

Applies theme class to <html> element

Contains header and layout structure

src/main.jsx
Application entry point

Wraps app with Redux <Provider>

Renders to DOM using createRoot

src/index.css
Imports Tailwind CSS v4

Defines dark mode custom variant

Custom animations (fade-in)

Global styles

🚀 Getting Started
Prerequisites
Node.js v16 or higher

npm v7 or higher (or yarn/pnpm)

Installation
Clone the repository

bash
git clone <your-repository-url>
cd user-directory-app
Install dependencies

bash
npm install
Start development server

bash
npm run dev
Open in browser

text
http://localhost:5173
The app should now be running! 🎉

📦 Available Scripts
bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

🌐 API Documentation
Base URL: https://reqres.in/api

Endpoints Used
Get Users (Paginated)
text
GET /users?page={page_number}
Response:

json
{
  "page": 1,
  "per_page": 6,
  "total": 12,
  "total_pages": 2,
  "data": [
    {
      "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://reqres.in/img/faces/1-image.jpg"
    }
  ]
}
🗂️ State Management
Redux State Structure
javascript
{
  users: {
    users: [],              // Array of user objects
    page: 1,               // Current page number
    totalPages: 1,         // Total pages from API
    loading: false,        // Loading indicator
    error: null,           // Error message (string or null)
    selectedUser: null,    // Selected user for modal
    favorites: []          // Array of favorite user IDs
  },
  theme: {
    mode: 'light'          // 'light' or 'dark'
  }
}
🎨 UI/UX Features
Responsive Design
Mobile (< 768px): Single column layout

Tablet (768px - 1024px): 2 columns

Desktop (> 1024px): 3 columns

Dark Mode
Toggle button in top-right corner

Persists across sessions (localStorage)

Smooth color transitions

All components support dark mode

Animations
Fade-in modal animations

Hover effects on cards (scale, shadow)

Smooth theme transitions

Loading spinner

Accessibility
ARIA labels on interactive elements

Keyboard navigation support

Focus visible states

Semantic HTML structure

🧪 Testing the Application
Manual Testing Checklist
User List
 Users load on initial page load

 Grid displays correctly on mobile/tablet/desktop

 User avatars display properly

 User names and emails are visible

Pagination
 Previous button disabled on first page

 Next button disabled on last page

 Page indicator shows correct page numbers

 Clicking Next/Previous loads new users

User Detail Modal
 Clicking user card opens modal

 Modal displays correct user info

 Close button (X) closes modal

 Footer close button works

React Router
 Clicking user navigates to /users/:id

 URL updates correctly

 Back button navigates to user list

 Direct URL access works

Favorites
 Heart icon toggles between filled/empty

 Favorites persist after page refresh

 Favorites work across pagination

 Favorite state correct on user detail page

Theme Toggle
 Theme toggle button visible

 Icon changes (moon/sun)

 Background colors change

 Text colors change

 Theme persists after refresh

Error Handling
 Displays error message on API failure

 Loading spinner shows during fetch

 Error UI is user-friendly

🐛 Troubleshooting
Common Issues
Theme not changing
Solution:

Ensure @custom-variant dark (&:where(.dark, .dark *)); is in index.css

Restart dev server after config changes

Clear browser cache (Ctrl+Shift+R)

API not loading
Solution:

Check network tab in DevTools

Verify API endpoint is correct

Check for CORS errors (shouldn't happen with ReqRes)

Favorites not persisting
Solution:

Check browser localStorage is enabled

Open DevTools > Application > Local Storage

Verify 'favorites' key exists

Routing not working
Solution:

Ensure react-router-dom is installed

Check App.jsx has <Router> wrapper

Verify routes are defined correctly
