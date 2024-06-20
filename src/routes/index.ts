import { Router } from 'express';
import hotelRoutes from './hotelRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/hotels', hotelRoutes);
router.use('/users', userRoutes);

export default router;
