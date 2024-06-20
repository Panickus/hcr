import { Router } from 'express';
import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation
} from '../controllers/reservationController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.route('/')
  .get(protect, getReservations)
  .post(protect, createReservation);

router.route('/:id')
  .put(protect, updateReservation)
  .delete(protect, deleteReservation);

export default router;
