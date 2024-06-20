"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const reservationModel_1 = __importDefault(require("./reservationModel"));
class Room extends sequelize_1.Model {
}
Room.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    number: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
    },
    type: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    available: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'rooms',
    sequelize: database_1.default,
});
Room.hasMany(reservationModel_1.default, { foreignKey: 'roomId' });
reservationModel_1.default.belongsTo(Room, { foreignKey: 'roomId' });
exports.default = Room;
