// src/models/user.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import CoffeeCount from './coffeeCount';

class User extends Model {
  public name!: string;
  public readonly sentCoffees?: CoffeeCount[];
  public readonly receivedCoffees?: CoffeeCount[];

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
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
