// src/services/profileService.js
import api from './api';

/**
 * Service pour mettre à jour le profil utilisateur
 */
export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/auth/update-profile', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Une erreur est survenue' };
  }
};

/**
 * Service pour mettre à jour le mot de passe
 */
export const updatePassword = async (passwordData) => {
  try {
    const response = await api.put('/auth/update-password', passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Une erreur est survenue' };
  }
};

/**
 * Service pour télécharger une image de profil
 */
export const uploadProfileImage = async (formData) => {
  try {
    const response = await api.post('/auth/upload-profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Une erreur est survenue' };
  }
};