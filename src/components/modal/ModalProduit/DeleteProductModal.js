import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

const DeleteProductModal = ({ isOpen, onClose, onConfirm, product }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!isOpen || !product) return null;

  const handleDelete = () => {
    // Pass the MongoDB _id (or fallback to id if _id doesn't exist)
    const productId = product._id || product.id;
    console.log("Deleting product with ID:", productId);
    onConfirm(productId);
  };

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
            Confirm Deletion
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

        {/* Confirmation Message */}
        <div className="mb-6">
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Are you sure you want to delete the product <span className="font-medium">{product.name}</span> (Code: {product.code})? This action cannot be undone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              isDark
                ? 'bg-gray-600 text-gray-200 hover:bg-gray-700'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
              isDark
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.string, // Add support for MongoDB _id
    name: PropTypes.string,
    code: PropTypes.string,
  }),
};

export default DeleteProductModal;