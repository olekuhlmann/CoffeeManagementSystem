// src/models/log.ts
import { DataTypes, Model, Sequelize, Association } from 'sequelize';
import User from './user';

class Log extends Model {
  public id!: number;
  public type!: 'createUser' | 'logCoffee';
  public userId?: number;
  public senderId?: number;
  public receiverId?: number;
  public createdAt!: Date;

  // Association properties
  public user?: User; // Associated user for createUser
  public sender?: User; // Associated sender for logCoffee
  public receiver?: User; // Associated receiver for logCoffee

  public static associations: {
    user: Association<Log, User>;
    sender: Association<Log, User>;
    receiver: Association<Log, User>;
  };

  static initModel(sequelize: Sequelize) {
    Log.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: DataTypes.ENUM('createUser', 'logCoffee'),
          allowNull: false,
        },
        userId: {
          field: 'userid',
          type: DataTypes.INTEGER,
          allowNull: true, // Conditionally required for 'createUser'
        },
        senderId: {
          field: 'senderid',
          type: DataTypes.INTEGER,
          allowNull: true, // Conditionally required for 'logCoffee'
        },
        receiverId: {
          field: 'receiverid',
          type: DataTypes.INTEGER,
          allowNull: true, // Conditionally required for 'logCoffee'
        },
        createdAt: {
          field: 'createdat',
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'logs',
        timestamps: false,
        validate: {
          // Sequelize validation for createUser type
          userIdRequiredForCreateUser() {
            if (this.type === 'createUser' && !this.userId) {
              throw new Error('userId is required for createUser logs');
            }
          },
          // Sequelize validation for logCoffee type
          senderAndReceiverRequiredForLogCoffee() {
            if (
              this.type === 'logCoffee' &&
              (!this.senderId || !this.receiverId)
            ) {
              throw new Error('senderId and receiverId are required for logCoffee logs');
            }
          },
        },
      }
    );
  }

}

export default Log;
