// src/components/modal/LogoutButton.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

const LogoutButton = ({ isCollapsed, isDark }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Logout button */}
      <div className={`p-4 flex justify-center`}>
        <button 
          onClick={() => setShowModal(true)}
          className={`${isCollapsed ? 'w-12 px-3' : 'w-full px-4'} ${isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'} text-white py-3 rounded-lg transition-all flex items-center justify-center`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${!isCollapsed && 'mr-2'}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm9 4a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
            <path d="M13 7h4v4h-4V7z" />
          </svg>
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-6 max-w-sm mx-auto shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4">Confirmation</h3>
            <p className="mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)} 
                className={`px-4 py-2 rounded-md ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Annuler
              </button>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;