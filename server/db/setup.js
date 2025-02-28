import { pool } from './config.js';

// SQL statements to create tables if they don't exist
const setupQueries = [
  // Users table
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  
  // Products table
  `CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  
  // Insert default admin user if not exists
  `INSERT INTO users (username, password, is_admin)
   SELECT 'admin', 'admin123', TRUE
   WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin')`,
  
  // Insert default regular user if not exists
  `INSERT INTO users (username, password, is_admin)
   SELECT 'user', 'user123', FALSE
   WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'user')`,
  
  // Insert sample products if the products table is empty
  `INSERT INTO products (name, price, description, image, category)
   SELECT 'Wireless Headphones', 129.99, 'Premium wireless headphones with noise cancellation and 30-hour battery life.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Electronics'
   WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1)`,
  
  `INSERT INTO products (name, price, description, image, category)
   SELECT 'Smart Watch', 199.99, 'Feature-packed smartwatch with health tracking, notifications, and customizable watch faces.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Electronics'
   WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1)`,
  
  `INSERT INTO products (name, price, description, image, category)
   SELECT 'Leather Backpack', 89.99, 'Stylish and durable leather backpack with multiple compartments for everyday use.', 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Fashion'
   WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1)`,
  
  `INSERT INTO products (name, price, description, image, category)
   SELECT 'Ceramic Coffee Mug', 24.99, 'Handcrafted ceramic coffee mug with minimalist design and comfortable handle.', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Home'
   WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1)`,
  
  `INSERT INTO products (name, price, description, image, category)
   SELECT 'Fitness Tracker', 79.99, 'Waterproof fitness tracker with heart rate monitoring and sleep tracking capabilities.', 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Electronics'
   WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1)`,
  
  `INSERT INTO products (name, price, description, image, category)
   SELECT 'Portable Bluetooth Speaker', 59.99, 'Compact Bluetooth speaker with powerful sound and 12-hour battery life.', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Electronics'
   WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1)`
];

// Function to setup the database
const setupDatabase = async () => {
  const connection = await pool.getConnection();
  
  try {
    // Execute each query
    for (const query of setupQueries) {
      await connection.query(query);
    }
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    connection.release();
  }
};

export { setupDatabase };