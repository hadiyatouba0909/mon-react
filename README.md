# Product Management System - React Frontend

A comprehensive product management application built with React that includes complete authentication, a theme-switching UI, product CRUD operations, and a modern dashboard layout.

## Features

### 🔒 Secure Authentication
- Login with username/email and password
- Registration with comprehensive user information
- Password reset functionality
- Token-based authentication
- User session management with context API

### 💻 Modern UI with Dark/Light Theme
- Responsive design works on all devices
- Theme switching functionality with persistent preferences
- Sleek dark-themed interface with particle background
- Interactive elements with hover effects
- Loading states with animated spinners

### 📱 Application Layout
- Modern dashboard layout with collapsible sidebar
- Responsive navigation with mobile support
- User profile display in sidebar
- Notifications and settings access in navbar

### 📋 Product Management
- Complete CRUD operations for products
- Modals for adding, editing, viewing, and deleting products
- Form validation with error handling
- Confirmation dialogs for critical actions
- Responsive pagination system with customizable display

### 🛠️ Technical Features
- Form validation and error handling
- Secure password management
- Show/hide password toggles
- Comprehensive state management with Context API
- Login persistence with "Remember me" option
- Theme-aware UI components
- Token-based authentication

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. **Clone the repository**
   ```
   git clone https://github.com/your-username/auth-system.git
   cd auth-system
   ```

2. **Install dependencies**
   ```
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```
   npm start
   # or
   yarn start
   ```

4. **Open your browser and navigate to http://localhost:3000**

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── ForgotPassword.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── ResetPassword.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   └── ThemeToggleButton.js
│   ├── layout/
│   │   ├── Layout.js
│   │   ├── Navbar.js
│   │   └── Sidebar.js
│   ├── modal/
│   │   ├── DeleteProductModal.js
│   │   ├── EditProductModal.js
│   │   ├── LogoutButton.js
│   │   ├── ProductDetailsModal.js
│   │   └── ProductModal.js
│   └── paginations/
│       └── Pagination.js
├── pages/
│   └── Dashboard.js
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── profileService.js
│   └── productService.js
├── App.js
└── ...
```

## Authentication Flow

### Registration
1. User fills out the registration form
2. Form data is validated client-side
3. Data is sent to authentication service
4. User is redirected to login page with success message

### Login
1. User enters credentials
2. Credentials are validated and sent to authentication service
3. On success, user is redirected to dashboard
4. User can select "Remember me" for persistent login
5. Authentication token is stored in localStorage

### Session Management
- AuthContext maintains the authentication state
- Automatic authentication check on application start
- Protected routes redirect unauthenticated users
- Current user information is accessible throughout the app

### Theme Management
- User theme preference is stored in localStorage
- ThemeContext provides theme state across the application
- Toggle button for switching between light and dark modes
- Consistent styling based on selected theme

### Password Reset
1. User enters email on forgot password page
2. Reset link is sent to user's email
3. User clicks link and is taken to reset password page
4. User enters and confirms new password
5. On success, user is redirected to login page

### Logout
1. User can log out through the sidebar LogoutButton
2. Authentication token is removed from localStorage
3. User session is terminated
4. User is redirected to login page

## Technologies Used

### Frontend
- React.js (v18.3)
- React Router (v7.5)
- Context API for state management (Auth & Theme contexts)
- Tailwind CSS for styling
- Responsive design with mobile support
- PropTypes for component type checking

### UI Features
- Dark/Light theme toggle with localStorage persistence
- Theme-aware components that adapt to theme changes
- Collapsible sidebar for better space utilization
- Modal system for forms and confirmations
- Accessible pagination with keyboard navigation
- Interactive SVG icons
- Animated transitions and micro-interactions

### Backend Services
- RESTful API integration with Axios
- Token-based authentication
- localStorage for persistent authentication
- Support for MongoDB-style document IDs

## API Integration
- **api.js**: Configures Axios with base URL and JWT token interceptor for authenticated requests
- **authService.js**: Handles authentication-related API calls (register, login, logout, user info, password reset)
- **profileService.js**: Manages user profile updates, password changes, and profile image uploads
- **productService.js**: Implements CRUD operations for product management

## Dashboard Features
- Displays a paginated list of products with search functionality
- Supports CRUD operations through modal interfaces
- Implements responsive design with theme-aware styling
- Includes animated transitions and loading states
- Handles error states and empty search results

## Profile Management
- Allows users to update their profile information (name, phone, address)
- Provides success/error feedback for profile updates
- Integrates with AuthContext for real-time user data updates
- Supports theme-aware styling

## Routing
- Implements protected and public routes using React Router
- Automatically redirects authenticated users to dashboard
- Redirects unauthenticated users to login page
- Handles unknown routes by redirecting to login
- Includes loading states during authentication checks

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
- React
- Tailwind CSS
- React Router