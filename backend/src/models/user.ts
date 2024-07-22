// src/models/user.ts
import { DataTypes, Model, Association } from 'sequelize';
import { sequelize } from '../database';
import CoffeeCount from './coffeeCount';

class User extends Model {
  public name!: string;

  public readonly sentCoffees?: CoffeeCount[];
  public readonly receivedCoffees?: CoffeeCount[];

  public static associations: {
    sentCoffees: Association<User, CoffeeCount>;
    receivedCoffees: Association<User, CoffeeCount>;
  };
}

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

export default User;
