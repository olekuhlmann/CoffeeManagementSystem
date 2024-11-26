// src/models/coffeeCount.ts
import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import User from './user';

class CoffeeCount extends Model {
  public senderId!: number;
  public receiverId!: number;
  public count!: number;

 
  public sender?: User; 
  public receiver?: User; 

  public static associations: {
    sender: Association<CoffeeCount, User>;
    receiver: Association<CoffeeCount, User>;
  };

  static initModel(sequelize: Sequelize) {
    CoffeeCount.init(
      {
        senderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
        receiverId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
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
