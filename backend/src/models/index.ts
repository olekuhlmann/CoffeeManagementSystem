// src/models/index.ts
import { Sequelize } from 'sequelize';
import User from './user';
import { CoffeeCount, CoffeeCountSimplified, BaseCoffeeCount } from './coffeeCount';
import Log from './log';

const initModels = (sequelize: Sequelize) => {
  User.initModel(sequelize);
  CoffeeCount.initModel(sequelize);
  CoffeeCountSimplified.initModel(sequelize);
  Log.initModel(sequelize);

  // Define associations
  User.hasMany(CoffeeCount, { foreignKey: 'senderid', as: 'sentCoffeesRaw' });
  User.hasMany(CoffeeCount, { foreignKey: 'receiverid', as: 'receivedCoffeesRaw' });
  CoffeeCount.belongsTo(User, { foreignKey: 'senderid', as: 'sender' });
  CoffeeCount.belongsTo(User, { foreignKey: 'receiverid', as: 'receiver' });

  User.hasMany(CoffeeCountSimplified, { foreignKey: 'senderid', as: 'sentCoffeesSimplified' });
  User.hasMany(CoffeeCountSimplified, { foreignKey: 'receiverid', as: 'receivedCoffeesSimplified' });
  CoffeeCountSimplified.belongsTo(User, { foreignKey: 'senderid', as: 'sender' });
  CoffeeCountSimplified.belongsTo(User, { foreignKey: 'receiverid', as: 'receiver' });

  Log.belongsTo(User, { foreignKey: 'userid', as: 'user' });
  Log.belongsTo(User, { foreignKey: 'senderid', as: 'sender' });
  Log.belongsTo(User, { foreignKey: 'receiverid', as: 'receiver' });

};

export { User, CoffeeCount, Log, initModels, CoffeeCountSimplified, BaseCoffeeCount };
