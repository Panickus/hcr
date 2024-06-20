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
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRooms = void 0;
const roomModel_1 = __importDefault(require("../models/roomModel"));
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield roomModel_1.default.findAll();
        res.status(200).json(rooms);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch rooms' });
    }
});
exports.getRooms = getRooms;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number, type, price, description, available } = req.body;
    try {
        const room = yield roomModel_1.default.create({ number, type, price, description, available });
        res.status(201).json(room);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create room' });
    }
});
exports.createRoom = createRoom;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { number, type, price, description, available } = req.body;
    try {
        const room = yield roomModel_1.default.findByPk(id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        room.number = number || room.number;
        room.type = type || room.type;
        room.price = price || room.price;
        room.description = description || room.description;
        room.available = available !== undefined ? available : room.available;
        yield room.save();
        res.status(200).json(room);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update room' });
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const room = yield roomModel_1.default.findByPk(id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        yield room.destroy();
        res.status(200).json({ message: 'Room deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to delete room' });
    }
});
exports.deleteRoom = deleteRoom;
