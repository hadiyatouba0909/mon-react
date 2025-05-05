import api from './api';

// Service pour récupérer tous les produits
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    console.log("Products fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response?.data || { message: 'An error occurred while fetching products' };
  }
};

// Service pour récupérer un produit par ID
export const getProductById = async (id) => {
  try {
    console.log("Fetching product with ID:", id);
    const response = await api.get(`/products/${id}`);
    console.log("Product fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error.response?.data || { message: 'An error occurred while fetching the product' };
  }
};

// Service pour créer un produit
export const createProduct = async (productData) => {
  try {
    console.log("Creating product with data:", productData);
    const response = await api.post('/products', productData);
    console.log("Product created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error.response?.data || { message: 'An error occurred while creating the product' };
  }
};

// Service pour mettre à jour un produit
export const updateProduct = async (id, productData) => {
  try {
    console.log("Updating product with ID:", id);
    console.log("Update data:", productData);
    
    // For MongoDB, we need to ensure _id isn't included in the update data
    const dataToSend = { ...productData };
    if (dataToSend._id) {
      delete dataToSend._id; // MongoDB doesn't allow modifying _id
    }
    
    const response = await api.put(`/products/${id}`, dataToSend);
    console.log("Product updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    console.error("Error details:", error.response?.data);
    throw error.response?.data || { message: 'An error occurred while updating the product' };
  }
};

// Service pour supprimer un produit
export const deleteProduct = async (id) => {
  try {
    console.log("Deleting product with ID:", id);
    const response = await api.delete(`/products/${id}`);
    console.log("Product deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    console.error("Error details:", error.response?.data);
    throw error.response?.data || { message: 'An error occurred while deleting the product' };
  }
};