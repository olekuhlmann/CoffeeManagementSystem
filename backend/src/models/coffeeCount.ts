// src/models/coffeeCount.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database'; // Import the sequelize instance

class CoffeeCount extends Model {
  public sender!: string;
  public receiver!: string;
  public count!: number;
}

CoffeeCount.init(
  {
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'name',
      },
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'name',
      },
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'coffees',
    timestamps: false,
  }
);

export default CoffeeCount;
