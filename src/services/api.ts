import axios from 'axios';
import { Product, User } from '../types';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Product API functions
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data.map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      description: product.description,
      image: product.image,
      category: product.category
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await api.get(`/products/${id}`);
    const product = response.data;
    return {
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      description: product.description,
      image: product.image,
      category: product.category
    };
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product | null> => {
  try {
    const response = await api.post('/products', product);
    const newProduct = response.data;
    return {
      id: newProduct.id.toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      image: newProduct.image,
      category: newProduct.category
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<boolean> => {
  try {
    await api.put(`/products/${id}`, product);
    return true;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    return false;
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    return false;
  }
};

// User API functions
export const getUserByCredentials = async (username: string, password: string): Promise<User | null> => {
  try {
    const response = await api.post('/users/login', { username, password });
    const user = response.data;
    return {
      username: user.username,
      password: '', // Don't store password in frontend
      isAdmin: user.isAdmin
    };
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

export const registerUser = async (username: string, password: string): Promise<User | null> => {
  try {
    const response = await api.post('/users/register', { username, password });
    const user = response.data;
    return {
      username: user.username,
      password: '', // Don't store password in frontend
      isAdmin: user.isAdmin
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
};

export default api;