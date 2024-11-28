// src/models/coffeeCount.ts
import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import User from './user';

// Genreic base class for coffee count tables
export class BaseCoffeeCount extends Model {
  public senderId!: number;
  public receiverId!: number;
  public count!: number;

  public sender?: User;
  public receiver?: User;

  public static associations: {
    sender: Association<BaseCoffeeCount, User>;
    receiver: Association<BaseCoffeeCount, User>;
  };

  static initBaseModel(sequelize: Sequelize, tableName: string) {
    this.init(
      {
        senderId: {
          field: 'senderid',
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
        receiverId: {
          field: 'receiverid',
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
        tableName,
        timestamps: false,
      }
    );
  }
}

// Table for raw coffee data
export class CoffeeCount extends BaseCoffeeCount {
  static initModel(sequelize: Sequelize) {
    this.initBaseModel(sequelize, 'coffees'); 
  }
}

// Table for simplified coffee data
export class CoffeeCountSimplified extends BaseCoffeeCount {
  static initModel(sequelize: Sequelize) {
    this.initBaseModel(sequelize, 'coffees-simplified'); 
  }
}