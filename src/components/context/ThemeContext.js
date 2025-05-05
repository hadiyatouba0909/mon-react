import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte pour le thème
const ThemeContext = createContext();

// Hook personnalisé pour utiliser le thème
export const useTheme = () => useContext(ThemeContext);

// Fournisseur du thème
export const ThemeProvider = ({ children }) => {
  // Vérifier si le thème est stocké dans localStorage, sinon utiliser 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Effet pour appliquer le thème à l'élément HTML
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Enlever les anciennes classes
    root.classList.remove('light', 'dark');
    
    // Ajouter la nouvelle classe de thème
    root.classList.add(theme);
    
    // Sauvegarder le thème dans localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fonction pour basculer entre les modes clair et sombre
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;