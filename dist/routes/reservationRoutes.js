"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservationController_1 = require("../controllers/reservationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.route('/')
    .get(authMiddleware_1.protect, reservationController_1.getReservations)
    .post(authMiddleware_1.protect, reservationController_1.createReservation);
router.route('/:id')
    .put(authMiddleware_1.protect, reservationController_1.updateReservation)
    .delete(authMiddleware_1.protect, reservationController_1.deleteReservation);
exports.default = router;
