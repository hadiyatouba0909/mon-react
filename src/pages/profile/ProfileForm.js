import React, { useState, useContext, useEffect } from 'react';
import { updateProfile } from '../../services/profileService';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, login } = useContext(AuthContext);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Charger les données de l'utilisateur au chargement du composant
  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        telephone: user.telephone || '',
        adresse: user.adresse || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await updateProfile(formData);
      setSuccess(response.message || 'Profil mis à jour avec succès');
      
      // Mettre à jour les données utilisateur dans le contexte
      if (response.user) {
        // Récupérer le token actuel du localStorage
        const token = localStorage.getItem('auth_token');
        // Mettre à jour le contexte avec les nouvelles données utilisateur
        login(token, response.user);
      }
    } catch (error) {
      setError(error.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className="text-2xl font-semibold mb-6">Modifier votre profil</h2>
      
      {/* Message d'erreur */}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {/* Message de succès */}
      {success && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nom" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Nom
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              value={formData.nom}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${isDark ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
          </div>
          
          <div>
            <label htmlFor="prenom" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Prénom
            </label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              value={formData.prenom}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${isDark ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="telephone" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Téléphone
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              value={formData.telephone}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${isDark ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
          </div>
          
          <div>
            <label htmlFor="adresse" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Adresse
            </label>
            <input
              id="adresse"
              name="adresse"
              type="text"
              value={formData.adresse}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${isDark ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isDark ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </span>
            ) : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;