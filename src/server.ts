import express from 'express';
import { connectDB } from './config/database';
import config from './config/config';
import userRoutes from './routes/userRoutes';
import hotelRoutes from './routes/hotelRoutes';
import roomRoutes from './routes/roomRoutes';
import reservationRoutes from './routes/reservationRoutes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorMiddleware';
import { requestLogger } from './middlewares/logger';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(rateLimit);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// Conectar a la base de datos
connectDB();

app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = config.port || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
