"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.createReservation = exports.getReservations = void 0;
const reservationModel_1 = __importDefault(require("../models/reservationModel"));
const roomModel_1 = __importDefault(require("../models/roomModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const getReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield reservationModel_1.default.findAll({ include: [userModel_1.default, roomModel_1.default] });
        res.status(200).json(reservations);
    }
    catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(400).json({ error: 'Failed to fetch reservations' });
    }
});
exports.getReservations = getReservations;
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request body:', req.body); // Log del cuerpo de la solicitud
    const { userId, roomId, checkInDate, checkOutDate } = req.body;
    try {
        const user = yield userModel_1.default.findByPk(userId);
        if (!user) {
            console.error('User not found:', userId); // Log cuando el usuario no se encuentra
            return res.status(404).json({ error: 'User not found' });
        }
        const room = yield roomModel_1.default.findByPk(roomId);
        if (!room) {
            console.error('Room not found:', roomId); // Log cuando la habitación no se encuentra
            return res.status(404).json({ error: 'Room not found' });
        }
        const reservation = yield reservationModel_1.default.create({ userId, roomId, checkInDate, checkOutDate });
        console.log('Reservation created:', reservation); // Log de la reserva creada
        res.status(201).json(reservation);
    }
    catch (error) {
        console.error('Error creating reservation:', error); // Log del error
        console.error('User:', userId, 'Room:', roomId, 'Dates:', checkInDate, '-', checkOutDate);
        res.status(400).json({ error: 'Failed to create reservation' });
    }
});
exports.createReservation = createReservation;
const updateReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId, roomId, checkInDate, checkOutDate, status } = req.body;
    try {
        const reservation = yield reservationModel_1.default.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        reservation.userId = userId || reservation.userId;
        reservation.roomId = roomId || reservation.roomId;
        reservation.checkInDate = checkInDate || reservation.checkInDate;
        reservation.checkOutDate = checkOutDate || reservation.checkOutDate;
        reservation.status = status || reservation.status;
        yield reservation.save();
        res.status(200).json(reservation);
    }
    catch (error) {
        console.error('Error updating reservation:', error);
        res.status(400).json({ error: 'Failed to update reservation' });
    }
});
exports.updateReservation = updateReservation;
const deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reservation = yield reservationModel_1.default.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        yield reservation.destroy();
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(400).json({ error: 'Failed to delete reservation' });
    }
});
exports.deleteReservation = deleteReservation;
