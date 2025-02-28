import { pool } from '../db/config.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error(`Error fetching product with id ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO products (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
      [name, price, description, image, category]
    );
    
    const [newProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
    
    res.status(201).json(newProduct[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, image, category } = req.body;
    
    // Check if product exists
    const [existingProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    
    if (existingProduct.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update product
    await pool.query(
      'UPDATE products SET name = ?, price = ?, description = ?, image = ?, category = ? WHERE id = ?',
      [
        name || existingProduct[0].name,
        price || existingProduct[0].price,
        description || existingProduct[0].description,
        image || existingProduct[0].image,
        category || existingProduct[0].category,
        id
      ]
    );
    
    const [updatedProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    
    res.json(updatedProduct[0]);
  } catch (error) {
    console.error(`Error updating product with id ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if product exists
    const [existingProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    
    if (existingProduct.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Delete product
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(`Error deleting product with id ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};