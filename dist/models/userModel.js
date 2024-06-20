"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../config/database"));
const reservationModel_1 = __importDefault(require("./reservationModel"));
class User extends sequelize_1.Model {
    comparePassword(candidatePassword) {
        return bcryptjs_1.default.compareSync(candidatePassword, this.password); // Comparar contraseña
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'users',
    sequelize: database_1.default,
});
User.hasMany(reservationModel_1.default, { foreignKey: 'userId' });
reservationModel_1.default.belongsTo(User, { foreignKey: 'userId' });
exports.default = User;
