"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Hotel extends sequelize_1.Model {
}
Hotel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    location: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    description: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    contactInfo: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: 'hotels',
    sequelize: database_1.default,
});
exports.default = Hotel;
