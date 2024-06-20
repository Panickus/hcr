"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelRoutes_1 = __importDefault(require("./hotelRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = (0, express_1.Router)();
router.use('/hotels', hotelRoutes_1.default);
router.use('/users', userRoutes_1.default);
exports.default = router;
