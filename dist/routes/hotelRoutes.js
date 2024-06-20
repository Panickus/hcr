"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelController_1 = require("../controllers/hotelController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.route('/')
    .post(authMiddleware_1.protect, authMiddleware_1.admin, hotelController_1.createHotel);
router.route('/:id')
    .get(authMiddleware_1.protect, hotelController_1.getHotel)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, hotelController_1.updateHotel)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, hotelController_1.deleteHotel);
exports.default = router;
