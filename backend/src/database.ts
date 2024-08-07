// src/database.ts
import { Sequelize } from 'sequelize';
import { initModels } from './models';

const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL || "please provide a DATABASE_URL";

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: !isProduction, // Enable logging only in development
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
});

// Initialize all models
initModels(sequelize);

export default sequelize;
