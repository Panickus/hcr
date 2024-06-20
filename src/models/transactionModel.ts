import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Transaction extends Model {
  public id!: number;
  public amount!: number;
  public currency!: string;
  public status!: string;
  public paymentIntentId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    currency: {
      type: new DataTypes.STRING(3),
      allowNull: false,
    },
    status: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    paymentIntentId: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'transactions',
    sequelize,
  }
);

export default Transaction;
