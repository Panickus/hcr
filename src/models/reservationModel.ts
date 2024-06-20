import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Reservation extends Model {
  public id!: number;
  public userId!: number;
  public roomId!: number;
  public checkInDate!: Date;
  public checkOutDate!: Date;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users', // Nombre de la tabla de usuarios
        key: 'id',
      },
    },
    roomId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'rooms', // Nombre de la tabla de habitaciones
        key: 'id',
      },
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    tableName: 'reservations',
    sequelize,
  }
);

export default Reservation;
