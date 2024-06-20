"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const config_1 = __importDefault(require("./config/config"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const hotelRoutes_1 = __importDefault(require("./routes/hotelRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Conectar a la base de datos
(0, database_1.connectDB)();
app.use('/api/users', userRoutes_1.default);
app.use('/api/hotels', hotelRoutes_1.default);
app.use('/api/rooms', roomRoutes_1.default);
app.use('/api/reservations', reservationRoutes_1.default);
const PORT = config_1.default.port || 5000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
exports.default = app;
