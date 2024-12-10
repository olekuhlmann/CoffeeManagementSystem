// src/models/user.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import {CoffeeCount} from './coffeeCount';

class User extends Model {
  public id!: number;
  public name!: string;
  public readonly sentCoffeesRaw?: CoffeeCount[];
  public readonly sentCoffeesSimplified?: CoffeeCount[];
  public readonly receivedCoffeesRaw?: CoffeeCount[];
  public readonly receivedCoffeesSimplified?: CoffeeCount[];

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: false,
      }
    );
  }
}

export default User;
