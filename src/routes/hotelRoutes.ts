import express from 'express';
import {
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel,
} from '../controllers/hotelController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, admin, createHotel);

router.route('/:id')
  .get(protect, getHotel)
  .put(protect, admin, updateHotel)
  .delete(protect, admin, deleteHotel);

export default router;
