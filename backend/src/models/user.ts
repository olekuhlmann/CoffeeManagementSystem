// src/models/user.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class User extends Model {
  public name!: string;
  public owes!: Record<string, number>;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    owes: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
