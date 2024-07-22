// src/database.ts
import { Sequelize } from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Import models after initializing Sequelize
import User from './models/user';
import CoffeeCount from './models/coffeeCount';

// Define associations after importing models
User.hasMany(CoffeeCount, { foreignKey: 'sender', as: 'sentCoffees' });
User.hasMany(CoffeeCount, { foreignKey: 'receiver', as: 'receivedCoffees' });
CoffeeCount.belongsTo(User, { foreignKey: 'sender', as: 'senderUser' });
CoffeeCount.belongsTo(User, { foreignKey: 'receiver', as: 'receiverUser' });

export { sequelize, User, CoffeeCount };
export default sequelize;
