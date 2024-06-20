import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Hotel extends Model {
  public id!: number;
  public name!: string;
  public location!: string;
  public description!: string;
  public contactInfo!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Hotel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    location: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    contactInfo: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'hotels',
    sequelize,
  }
);

export default Hotel;
