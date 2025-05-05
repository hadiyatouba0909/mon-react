import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showPageNumbers = true,
  maxPageButtons = 5,
  className = ''
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Logic to limit number of visible page buttons
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    // Generate the page numbers array
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  // Early return if only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center space-x-1 py-4 ${className}`}>
      {/* First page button */}
      <button 
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`
          p-2 rounded transition-all duration-200
          ${isDark 
            ? 'text-gray-300 hover:bg-gray-700 disabled:text-gray-600 disabled:hover:bg-transparent' 
            : 'text-gray-700 hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent'
          }
          ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}
        `}
        aria-label="Go to first page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Previous page button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          p-2 rounded transition-all duration-200
          ${isDark 
            ? 'text-gray-300 hover:bg-gray-700 disabled:text-gray-600 disabled:hover:bg-transparent' 
            : 'text-gray-700 hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent'
          }
          ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}
        `}
        aria-label="Go to previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Page numbers */}
      {showPageNumbers && getPageNumbers().map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`
            w-10 h-10 flex items-center justify-center rounded transition-all duration-200
            ${currentPage === pageNumber 
              ? isDark 
                ? 'bg-indigo-600 text-white' 
                : 'bg-indigo-500 text-white'
              : isDark 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-200'
            }
            ${currentPage !== pageNumber ? 'hover:scale-105' : ''}
          `}
          aria-label={`Go to page ${pageNumber}`}
          aria-current={currentPage === pageNumber ? 'page' : undefined}
        >
          {pageNumber}
        </button>
      ))}
      
      {/* Next page button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          p-2 rounded transition-all duration-200
          ${isDark 
            ? 'text-gray-300 hover:bg-gray-700 disabled:text-gray-600 disabled:hover:bg-transparent' 
            : 'text-gray-700 hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent'
          }
          ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}
        `}
        aria-label="Go to next page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Last page button */}
      <button 
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`
          p-2 rounded transition-all duration-200
          ${isDark 
            ? 'text-gray-300 hover:bg-gray-700 disabled:text-gray-600 disabled:hover:bg-transparent' 
            : 'text-gray-700 hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent'
          }
          ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}
        `}
        aria-label="Go to last page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Page info */}
      <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;