<div align="center">

# 🚀 User Directory Dashboard

### A Modern React + Redux Application

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2.1-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Redux State Management](#redux-state-management)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

A production-ready user directory application built as part of a React Redux internship assignment. This project demonstrates modern React development practices, state management with Redux Toolkit, API integration, routing, and advanced features like theme switching and favorites management.

### ✨ Key Highlights

- 🔄 **Redux Toolkit** - Modern state management with slices and async thunks
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🌓 **Dark Mode** - System-aware theme with manual toggle
- ⭐ **Favorites** - Persistent favorites using localStorage
- 🚀 **Fast** - Built with Vite for lightning-fast development
- ♿ **Accessible** - WCAG compliant with ARIA labels and keyboard navigation

---

## ✨ Features

### Core Features

✅ **User List Display**
- Fetch and display paginated users from external API
- Grid layout with user avatar, name, and email
- Loading states with animated spinner
- Error handling with user-friendly messages

✅ **Pagination Controls**
- Navigate between pages with Previous/Next buttons
- Display current page and total pages
- Disabled states for first/last pages

✅ **User Detail View**
- Click user card to view detailed information
- Modal overlay with smooth animations
- Close button and click-outside-to-close

✅ **Search & Filter** _(Optional)_
- Real-time search by name or email
- Instant filtering results

### Bonus Features

⭐ **Favorites with localStorage**
- Mark/unmark users as favorites
- Persist across browser sessions
- Visual indicator (heart icon) on cards

⭐ **Dark/Light Theme Toggle**
- Redux-managed theme state
- Smooth color transitions
- Persists in localStorage
- System theme detection

⭐ **React Router Integration**
- Individual user pages at `/users/:id`
- Browser history support
- Deep linking capability

### Additional Enhancements

- 🎨 Modern UI with Tailwind CSS
- 🔄 Optimized re-renders with Redux selectors
- 📊 Clean separation of concerns
- 🛡️ Type-safe Redux with TypeScript-ready structure
- 🎭 Smooth animations and transitions

---

## 🛠️ Tech Stack

**Frontend:**
- [React 18](https://reactjs.org/) - UI Library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management
- [React Router v6](https://reactrouter.com/) - Routing
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling

**Build Tools:**
- [Vite](https://vitejs.dev/) - Build Tool & Dev Server
- [PostCSS](https://postcss.org/) - CSS Processing
- [Autoprefixer](https://github.com/postcss/autoprefixer) - CSS Vendor Prefixes

**API:**
- [ReqRes API](https://reqres.in/) - Mock REST API

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher) or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
