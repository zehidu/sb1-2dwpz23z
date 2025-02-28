import { pool } from '../db/config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Login user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // For simplicity in development, we're using plain text passwords
    // In production, you should use bcrypt to hash and compare passwords
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // For development, direct comparison
    // In production: const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create a user object without the password
    const userResponse = {
      id: user.id,
      username: user.username,
      isAdmin: user.is_admin === 1
    };
    
    res.json(userResponse);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

// Register user
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // For simplicity in development, we're using plain text passwords
    // In production, you should hash passwords: const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password;
    
    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)',
      [username, hashedPassword, false]
    );
    
    // Create a user object without the password
    const userResponse = {
      id: result.insertId,
      username,
      isAdmin: false
    };
    
    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [users] = await pool.query('SELECT id, username, is_admin, created_at FROM users WHERE id = ?', [id]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = users[0];
    
    // Create a user object without the password
    const userResponse = {
      id: user.id,
      username: user.username,
      isAdmin: user.is_admin === 1,
      createdAt: user.created_at
    };
    
    res.json(userResponse);
  } catch (error) {
    console.error(`Error fetching user with id ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};