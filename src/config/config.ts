import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5005,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT || 3306,
};
