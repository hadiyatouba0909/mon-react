// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashborard";
import Login from "./components/auth/Login";
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import { ThemeProvider } from './components/context/ThemeContext';
import { AuthProvider, AuthContext } from '../src/components/context/AuthContext';

// Route protégée qui vérifie l'authentification
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isLoading, checkAuth } = React.useContext(AuthContext);
  
  // Vérifier l'authentification au chargement du composant
  useEffect(() => {
    // Vérifier si checkAuth existe avant de l'appeler
    if (checkAuth) {
      checkAuth();
    }
  }, [checkAuth]);
  
  // Si en cours de chargement, afficher un spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  // Rediriger vers la page de connexion si non authentifié
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Route publique qui redirige vers le dashboard si déjà authentifié
const PublicRoute = ({ element }) => {
  const { isAuthenticated, isLoading, checkAuth } = React.useContext(AuthContext);
  
  // Vérifier l'authentification au chargement du composant
  useEffect(() => {
    // Vérifier si checkAuth existe avant de l'appeler
    if (checkAuth) {
      checkAuth();
    }
  }, [checkAuth]);
  
  // Si en cours de chargement, afficher un spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  // Rediriger vers le dashboard si déjà authentifié (sauf pour la page reset-password)
  if (isAuthenticated && !window.location.pathname.includes('/reset-password')) {
    return <Navigate to="/dashboard" />;
  }
  
  return element;
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="App transition-colors duration-300">
            <Routes>
              {/* Route racine redirige vers login ou dashboard selon l'état d'authentification */}
              <Route path="/" element={<Navigate to="/login" />} />
              
              {/* Routes publiques (accessibles sans authentification) */}
              <Route path="/login" element={<PublicRoute element={<Login />} />} />
              <Route path="/register" element={<PublicRoute element={<Register />} />} />
              <Route path="/forgot-password" element={<PublicRoute element={<ForgotPassword />} />} />
              <Route path="/reset-password/:resetToken" element={<PublicRoute element={<ResetPassword />} />} />
              
              {/* Routes protégées (nécessitent authentification) */}
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              
              {/* Redirection des routes inconnues */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;