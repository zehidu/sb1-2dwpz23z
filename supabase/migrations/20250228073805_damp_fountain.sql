-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS shopease;

USE shopease;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO users (username, password, is_admin)
VALUES ('admin', 'admin123', TRUE)
ON DUPLICATE KEY UPDATE username = 'admin';

-- Insert default regular user
INSERT INTO users (username, password, is_admin)
VALUES ('user', 'user123', FALSE)
ON DUPLICATE KEY UPDATE username = 'user';

-- Insert sample products
INSERT INTO products (name, price, description, image, category)
VALUES 
('Wireless Headphones', 129.99, 'Premium wireless headphones with noise cancellation and 30-hour battery life.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Electronics'),
('Smart Watch', 199.99, 'Feature-packed smartwatch with health tracking, notifications, and customizable watch faces.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Electronics'),
('Leather Backpack', 89.99, 'Stylish and durable leather backpack with multiple compartments for everyday use.', 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Fashion'),
('Ceramic Coffee Mug', 24.99, 'Handcrafted ceramic coffee mug with minimalist design and comfortable handle.', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Home'),
('Fitness Tracker', 79.99, 'Waterproof fitness tracker with heart rate monitoring and sleep tracking capabilities.', 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Electronics'),
('Portable Bluetooth Speaker', 59.99, 'Compact Bluetooth speaker with powerful sound and 12-hour battery life.', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'Electronics');