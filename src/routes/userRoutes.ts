import express from 'express';
import { check } from 'express-validator';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], registerUser);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], loginUser);

router.route('/profile').get(protect, getUserProfile);

export default router;
