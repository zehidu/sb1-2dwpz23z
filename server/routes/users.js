import express from 'express';
import {
  loginUser,
  registerUser,
  getUserProfile
} from '../controllers/userController.js';

const router = express.Router();

// Login
router.post('/login', loginUser);

// Register
router.post('/register', registerUser);

// Get user profile
router.get('/:id', getUserProfile);

export default router;