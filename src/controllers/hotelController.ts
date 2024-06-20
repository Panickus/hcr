import { Request, Response } from 'express';
import Hotel from '../models/hotelModel';

export const createHotel = async (req: Request, res: Response) => {
  try {
    const { name, location, description, contactInfo } = req.body;
    const hotel = await Hotel.create({ name, location, description, contactInfo });
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ error: 'Error creating hotel' });
  }
};

export const getHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error fetching hotel' });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const { name, location, description, contactInfo } = req.body;
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      await hotel.update({ name, location, description, contactInfo });
      res.status(200).json(hotel);
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error updating hotel' });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      await hotel.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error deleting hotel' });
  }
};
