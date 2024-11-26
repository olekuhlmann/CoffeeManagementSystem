// src/models/index.ts
import { Sequelize } from 'sequelize';
import User from './user';
import CoffeeCount from './coffeeCount';
import Log from './log';

const initModels = (sequelize: Sequelize) => {
  User.initModel(sequelize);
  CoffeeCount.initModel(sequelize);
  Log.initModel(sequelize);

  // Define associations
  User.hasMany(CoffeeCount, { foreignKey: 'senderId', as: 'sentCoffees' });
  User.hasMany(CoffeeCount, { foreignKey: 'receiverId', as: 'receivedCoffees' });
  CoffeeCount.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
  CoffeeCount.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });
};

export { User, CoffeeCount, Log, initModels };
