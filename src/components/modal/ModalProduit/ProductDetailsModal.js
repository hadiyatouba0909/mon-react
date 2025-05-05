import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-50 animate-fadeIn">
      <div
        className={`relative w-full max-w-md p-6 rounded-lg shadow-lg transition-all duration-300 ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Product Details
          </h2>
          <button
            onClick={onClose}
            className={`text-gray-500 hover:text-gray-700 ${
              isDark ? 'text-gray-400 hover:text-gray-200' : ''
            }`}
            title="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Product Name
            </label>
            <p className={`mt-1 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {product.name}
            </p>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Product Code
            </label>
            <p className={`mt-1 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {product.code}
            </p>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Quantity
            </label>
            <p className={`mt-1 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {product.quantity}
            </p>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Price
            </label>
            <p className={`mt-1 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              isDark
                ? 'bg-gray-600 text-gray-200 hover:bg-gray-700'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

ProductDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }),
};

export default ProductDetailsModal;