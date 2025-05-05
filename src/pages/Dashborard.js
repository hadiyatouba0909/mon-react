import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/ProduitService";
import Layout from "../components/common/Layout";
import { useTheme } from "../components/context/ThemeContext";
import Pagination from "../components/paginations/Pagination";
import ProductModal from "../components/modal/ModalProduit/ProductModal";
import ProductDetailsModal from "../components/modal/ModalProduit/ProductDetailsModal";
import EditProductModal from "../components/modal/ModalProduit/EditProductModal";
import DeleteProductModal from "../components/modal/ModalProduit/DeleteProductModal";

const Dashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // State to store products, initialized as empty arrays
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal state for adding product
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal state for editing product
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Modal state for deleting product
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Modal state for viewing details
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle search
  useEffect(() => {
    if (products) {
      // Only filter if products is defined
      const results = products.filter(
        (product) =>
          product &&
          (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.code?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(results);
      setCurrentPage(1); // Reset to first page when search changes
    }
  }, [searchTerm, products]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document
      .querySelector(".product-table-container")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle opening modal for adding product
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Handle closing modal for adding product
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Handle opening modal for editing product
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // Handle closing modal for editing product
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  // Handle opening modal for deleting product
  const handleOpenDeleteModal = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Handle closing modal for deleting product
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingProduct(null);
  };

  // Handle opening modal for viewing details
  const handleOpenDetailsModal = (product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  // Handle closing modal for viewing details
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle saving product (add or update)
  const handleSaveProduct = async (productData) => {
    try {
      console.log("Handling save product:", productData);

      // Determine which ID field to use (_id for MongoDB, fallback to id)
      const productId = productData._id || productData.id;

      if (productId) {
        // Update existing product
        console.log("Updating product with ID:", productId);

        // Create a data copy to send to API
        const dataToSend = { ...productData };
        // For MongoDB, remove _id from the payload to avoid errors
        if (dataToSend._id && productId === dataToSend._id) {
          delete dataToSend._id;
        }

        const updatedProduct = await updateProduct(productId, dataToSend);
        console.log("Product updated successfully:", updatedProduct);

        // Update products state with the updated product
        const updatedProducts = products.map((p) => {
          // Match by either _id or id (for flexibility)
          if ((p._id && p._id === productId) || (p.id && p.id === productId)) {
            return updatedProduct;
          }
          return p;
        });

        setProducts(updatedProducts);

        // Update filtered products considering the search term
        setFilteredProducts(
          updatedProducts.filter(
            (p) =>
              p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              p.code?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );

        // Close the edit modal
        setIsEditModalOpen(false);
        setEditingProduct(null);

      } else {
        // Add new product
        console.log("Adding new product:", productData);
        const newProduct = await createProduct(productData);
        console.log("Product added successfully:", newProduct);

        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);

        // Update filtered products considering the search term
        setFilteredProducts(
          updatedProducts.filter(
            (p) =>
              p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              p.code?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );

        // Close the add modal
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error in handleSaveProduct:", error);
      alert(error.message || "Error saving product");
    }
  };

  // Handle deleting product
  const handleDeleteProduct = async (productId) => {
    try {
      console.log("Deleting product with ID:", productId);

      // Call API to delete the product
      await deleteProduct(productId);
      console.log("Product deleted successfully, ID:", productId);

      // Update products state by filtering out the deleted product
      // Check both _id and id fields to handle MongoDB format
      const updatedProducts = products.filter((p) => {
        // If product has _id, compare with that
        if (p._id) {
          return p._id !== productId;
        }
        // Otherwise compare with id
        return p.id !== productId;
      });

      setProducts(updatedProducts);

      // Update filtered products considering the search term
      setFilteredProducts(
        updatedProducts.filter(
          (p) =>
            p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.code?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      // Close the delete modal
      setIsDeleteModalOpen(false);
      setDeletingProduct(null);

    } catch (error) {
      console.error("Error in handleDeleteProduct:", error);
      alert(error.message || "Error deleting product");
    }
  };

  return (
    <Layout>
      <div className="animate-fadeIn">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <h1
              className={`text-2xl font-semibold ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Products List
            </h1>

            <div className="relative w-full md:w-64 transition-all duration-200 ease-in-out">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className={`w-5 h-5 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                className={`block w-full p-2 pl-10 rounded-lg transition-all duration-200 text-sm
                ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                } border`}
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <button
            className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 transform hover:scale-105
              ${
                isDark
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }
            `}
            onClick={handleOpenAddModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Product
          </button>
        </div>

        {loading && (
          <div
            className={`text-center py-10 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <svg
              className="animate-spin h-10 w-10 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading products...
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-red-500 animate-pulse">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="product-table-container overflow-x-auto rounded-lg shadow transition-all duration-300 mb-6">
            <div
              className={`overflow-x-auto rounded-lg ${
                isDark ? "bg-gray-800" : "bg-white"
              } shadow transition-all duration-300`}
            >
              <table className="w-full">
                <thead className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                  <tr>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Name
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Code
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Quantity
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Price
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`
                        hover:${isDark ? "bg-gray-700" : "bg-gray-50"} 
                        transition-colors duration-150 ease-in-out
                        animate-fadeIn
                      `}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {product.name}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          isDark ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {product.code}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          isDark ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        <span
                          className={`
                          px-2 py-1 rounded-full text-xs
                          ${
                            product.quantity > 20
                              ? isDark
                                ? "bg-green-900 text-green-200"
                                : "bg-green-100 text-green-800"
                              : product.quantity > 10
                              ? isDark
                                ? "bg-yellow-900 text-yellow-200"
                                : "bg-yellow-100 text-yellow-800"
                              : isDark
                              ? "bg-red-900 text-red-200"
                              : "bg-red-100 text-red-800"
                          }
                        `}
                        >
                          {product.quantity}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          isDark ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            className={`p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110
                              ${
                                isDark
                                  ? "bg-blue-900 text-blue-300 hover:bg-blue-800"
                                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                              }
                            `}
                            title="View Details"
                            onClick={() => handleOpenDetailsModal(product)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>

                          <button
                            className={`p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110
                              ${
                                isDark
                                  ? "bg-indigo-900 text-indigo-300 hover:bg-indigo-800"
                                  : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                              }
                            `}
                            title="Edit Product"
                            onClick={() => handleOpenEditModal(product)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>

                          <button
                            className={`p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110
                              ${
                                isDark
                                  ? "bg-red-900 text-red-300 hover:bg-red-800"
                                  : "bg-red-100 text-red-600 hover:bg-red-200"
                              }
                            `}
                            title="Delete Product"
                            onClick={() => handleOpenDeleteModal(product)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div
            className={`text-center py-10 ${
              isDark ? "text-gray-300" : "text-gray-600"
            } animate-fadeIn`}
          >
            No products found matching your search
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
            onPageChange={handlePageChange}
            className={`mt-4 ${isDark ? "text-gray-200" : "text-gray-800"}`}
          />
        )}

        <ProductModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onSave={handleSaveProduct}
        />

        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveProduct}
          product={editingProduct}
        />

        <DeleteProductModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteProduct}
          product={deletingProduct}
        />

        <ProductDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          product={selectedProduct}
        />

        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out forwards;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Dashboard;
