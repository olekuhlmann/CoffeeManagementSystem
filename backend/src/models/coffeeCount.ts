// src/models/coffeeCount.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

class CoffeeCount extends Model {
  public sender!: string;
  public receiver!: string;
  public count!: number;

  static initModel(sequelize: Sequelize) {
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
  }
}

export default CoffeeCount;
