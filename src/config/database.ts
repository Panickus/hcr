import { Sequelize } from 'sequelize';
import config from './config';

const sequelize = new Sequelize(config.dbName!, config.dbUser!, config.dbPassword!, {
  host: config.dbHost,
  port: 3306, // Asegúrate de que el puerto sea correcto
  dialect: 'mysql',
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: false });
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
