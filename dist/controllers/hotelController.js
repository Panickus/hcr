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
exports.deleteHotel = exports.updateHotel = exports.getHotel = exports.createHotel = void 0;
const hotelModel_1 = __importDefault(require("../models/hotelModel"));
const createHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location, description, contactInfo } = req.body;
        const hotel = yield hotelModel_1.default.create({ name, location, description, contactInfo });
        res.status(201).json(hotel);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating hotel' });
    }
});
exports.createHotel = createHotel;
const getHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield hotelModel_1.default.findByPk(req.params.id);
        if (hotel) {
            res.status(200).json(hotel);
        }
        else {
            res.status(404).json({ error: 'Hotel not found' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Error fetching hotel' });
    }
});
exports.getHotel = getHotel;
const updateHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location, description, contactInfo } = req.body;
        const hotel = yield hotelModel_1.default.findByPk(req.params.id);
        if (hotel) {
            yield hotel.update({ name, location, description, contactInfo });
            res.status(200).json(hotel);
        }
        else {
            res.status(404).json({ error: 'Hotel not found' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating hotel' });
    }
});
exports.updateHotel = updateHotel;
const deleteHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield hotelModel_1.default.findByPk(req.params.id);
        if (hotel) {
            yield hotel.destroy();
            res.status(204).end();
        }
        else {
            res.status(404).json({ error: 'Hotel not found' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Error deleting hotel' });
    }
});
exports.deleteHotel = deleteHotel;
