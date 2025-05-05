// src/components/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { login as loginService, getCurrentUser } from '../../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour vérifier l'authentification
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setIsLoading(false);
        return;
      }
      
      const response = await getCurrentUser();
      if (response.success) {
        setCurrentUser(response.user);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      localStorage.removeItem('auth_token');
      setIsAuthenticated(false);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fonction de connexion
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await loginService(credentials);
      if (response.success) {
        setCurrentUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return { 
        success: false, 
        message: error.message || 'Une erreur est survenue lors de la connexion'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Vérifier l'authentification au chargement initial
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth,
        setCurrentUser,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};