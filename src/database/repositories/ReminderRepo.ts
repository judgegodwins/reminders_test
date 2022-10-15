import { InferAttributes, Op, WhereOptions } from "sequelize";
import { Reminder } from "../models";

export default class ReminderRepo {
  static create = async (
    data: Parameters<typeof Reminder.create<Reminder>>[0]
  ) => {
    return Reminder.create(data);
  };

  static getAll = async (user?: number, epoch?: number) => {
    return Reminder.findAll({
      order: [["id", "ASC"]],
      where: {
        ...(user ? { user } : {}),
        ...(epoch ? { date: { [Op.gte]: epoch } } : {}),
      },
    });
  };

  static getOne = async (id: number) => {
    return Reminder.findByPk(id);
  };
}
