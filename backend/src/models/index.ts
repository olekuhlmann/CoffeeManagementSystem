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
  User.hasMany(CoffeeCount, { foreignKey: 'sender', as: 'sentCoffees' });
  User.hasMany(CoffeeCount, { foreignKey: 'receiver', as: 'receivedCoffees' });
  CoffeeCount.belongsTo(User, { foreignKey: 'sender', as: 'senderUser' });
  CoffeeCount.belongsTo(User, { foreignKey: 'receiver', as: 'receiverUser' });
};

export { User, CoffeeCount, Log, initModels };
