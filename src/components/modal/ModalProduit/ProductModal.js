import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

const ProductModal = ({ isOpen, onClose, onSave }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    quantity: '',
    price: '',
  });

  // Error state for validation
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.code.trim()) newErrors.code = 'Product code is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be a positive number';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be a positive number';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare product data
    const newProduct = {
      name: formData.name.trim(),
      code: formData.code.trim(),
      quantity: parseInt(formData.quantity, 10),
      price: parseFloat(formData.price),
    };

    // Call onSave to add the product
    onSave(newProduct);

    // Reset form and close modal
    setFormData({ name: '', code: '', quantity: '', price: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

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
            Add New Product
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 rounded-md border transition-all duration-200 text-sm ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
              } ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Code Field */}
          <div>
            <label
              htmlFor="code"
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Product Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 rounded-md border transition-all duration-200 text-sm ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
              } ${errors.code ? 'border-red-500' : ''}`}
              placeholder="Enter product code"
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-500">{errors.code}</p>
            )}
          </div>

          {/* Quantity Field */}
          <div>
            <label
              htmlFor="quantity"
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className={`mt-1 block w-full p-2 rounded-md border transition-all duration-200 text-sm ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
              } ${errors.quantity ? 'border-red-500' : ''}`}
              placeholder="Enter quantity"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
            )}
          </div>

          {/* Price Field */}
          <div>
            <label
              htmlFor="price"
              className={`block text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              className={`mt-1 block w-full p-2 rounded-md border transition-all duration-200 text-sm ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
              } ${errors.price ? 'border-red-500' : ''}`}
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-6">
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
              type="submit"
              className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                isDark
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProductModal;