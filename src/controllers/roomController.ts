import { Request, Response } from 'express';
import Room from '../models/roomModel';

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch rooms' });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  const { number, type, price, description, available } = req.body;

  try {
    const room = await Room.create({ number, type, price, description, available });
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create room' });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { number, type, price, description, available } = req.body;

  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    room.number = number || room.number;
    room.type = type || room.type;
    room.price = price || room.price;
    room.description = description || room.description;
    room.available = available !== undefined ? available : room.available;

    await room.save();
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update room' });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    await room.destroy();
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete room' });
  }
};
