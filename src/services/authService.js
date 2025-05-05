// src/services/authService.js
import api from './api';

// Service d'inscription
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    // Ne pas essayer de stocker un token à l'inscription
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error.response?.data || { message: 'Une erreur est survenue' };
  }
};

// Service de connexion
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Une erreur est survenue' };
  }
};

// Service de déconnexion
export const logout = () => {
  localStorage.removeItem('auth_token');
};

// Service pour obtenir les informations de l'utilisateur connecté
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Une erreur est survenue' };
  }
};

// Service pour demander une réinitialisation de mot de passe
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Une erreur est survenue' };
  }
};

// Service pour réinitialiser le mot de passe
export const resetPassword = async (resetToken, passwords) => {
  try {
    const response = await api.put(`/auth/reset-password/${resetToken}`, passwords);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Une erreur est survenue' };
  }
};