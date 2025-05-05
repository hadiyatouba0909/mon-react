import React from 'react';
import ThemeToggleButton from '../context/ThemeToggleButton'; // Correction ici
import { useTheme } from '../context/ThemeContext'; // Correction ici

const Navbar = ({ onMenuClick }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const currentDate = new Date();
  const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('fr-FR', options);
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <header className={`${isDark ? 'bg-gray-800' : 'bg-indigo-600'} text-white rounded-l shadow-md transition-colors duration-300 max-w()`}>
      <div className="flex items-center justify-between px-4 py-4">
        {/* Burger menu button - always visible */}
        <button 
          onClick={onMenuClick}
          className={`rounded-full p-3 ${isDark ? 'bg-gray-700' : 'bg-black/30'} focus:outline-none ${isDark ? 'hover:bg-gray-600' : 'hover:bg-black/40'} transition-colors`}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Welcome message and date */}
        <div className="flex flex-col items-center flex-grow mx-4">
          <h1 className="text-xl font-semibold">Bonjour, Hadiyatou !</h1>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'opacity-90'}`}>{capitalizedDate}</p>
        </div>
        
        {/* Right icons */}
        <div className="flex items-center space-x-3">
          {/* Theme toggle button */}
          <ThemeToggleButton />
          
          {/* Notifications button */}
          <button className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-indigo-700'} transition-colors`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          {/* Settings button */}
          <button className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-indigo-700'} transition-colors`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;