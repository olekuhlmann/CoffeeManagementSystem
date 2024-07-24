// src/models/log.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

class Log extends Model {
  public id!: number;
  public message!: string;
  public createdAt!: Date;

  static initModel(sequelize: Sequelize) {
    Log.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'logs',
        timestamps: false,
      }
    );
  }
}

export default Log;
