"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    currency: {
        type: new sequelize_1.DataTypes.STRING(3),
        allowNull: false,
    },
    status: {
        type: new sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    paymentIntentId: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'transactions',
    sequelize: database_1.default,
});
exports.default = Transaction;
