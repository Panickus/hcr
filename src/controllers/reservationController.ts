import { Request, Response } from 'express';
import Reservation from '../models/reservationModel';
import Room from '../models/roomModel';
import User from '../models/userModel';

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.findAll({ include: [User, Room] });
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(400).json({ error: 'Failed to fetch reservations' });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  console.log('Request body:', req.body); // Log del cuerpo de la solicitud

  const { userId, roomId, checkInDate, checkOutDate } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      console.error('User not found:', userId); // Log cuando el usuario no se encuentra
      return res.status(404).json({ error: 'User not found' });
    }

    const room = await Room.findByPk(roomId);
    if (!room) {
      console.error('Room not found:', roomId); // Log cuando la habitación no se encuentra
      return res.status(404).json({ error: 'Room not found' });
    }

    const reservation = await Reservation.create({ userId, roomId, checkInDate, checkOutDate });
    console.log('Reservation created:', reservation); // Log de la reserva creada
    res.status(201).json(reservation);
  } catch (error) {
    console.error('Error creating reservation:', error); // Log del error
    console.error('User:', userId, 'Room:', roomId, 'Dates:', checkInDate, '-', checkOutDate);
    res.status(400).json({ error: 'Failed to create reservation' });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, roomId, checkInDate, checkOutDate, status } = req.body;

  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    reservation.userId = userId || reservation.userId;
    reservation.roomId = roomId || reservation.roomId;
    reservation.checkInDate = checkInDate || reservation.checkInDate;
    reservation.checkOutDate = checkOutDate || reservation.checkOutDate;
    reservation.status = status || reservation.status;

    await reservation.save();
    res.status(200).json(reservation);
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(400).json({ error: 'Failed to update reservation' });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    await reservation.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(400).json({ error: 'Failed to delete reservation' });
  }
};
