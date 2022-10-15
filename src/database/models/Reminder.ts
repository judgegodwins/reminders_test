import { DataTypes, Sequelize } from "sequelize";
import { Init } from "../../types/db";
import GenericModel, { genericFields } from "./generic";

export default class Reminder extends GenericModel<Reminder> {
  user: number;
  description: string;
  date: Date;
}

export const init: Init = (sequelize: Sequelize) => {
  Reminder.init(
    {
      ...genericFields,
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    { sequelize, tableName: "reminders" }
  );

  return Reminder;
};