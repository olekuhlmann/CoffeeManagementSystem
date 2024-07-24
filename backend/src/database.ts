// src/database.ts
import { Sequelize } from 'sequelize';
import { initModels } from './models';

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Initialize all models
initModels(sequelize);

// Sync all models
sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized');
});

export default sequelize;
