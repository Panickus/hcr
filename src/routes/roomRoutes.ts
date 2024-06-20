import { Router } from 'express';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../controllers/roomController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getRooms);
router.post('/', protect, createRoom);
router.put('/:id', protect, updateRoom);
router.delete('/:id', protect, deleteRoom);

export default router;
