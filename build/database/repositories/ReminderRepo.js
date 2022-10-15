"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
class ReminderRepo {
}
exports.default = ReminderRepo;
_a = ReminderRepo;
ReminderRepo.create = async (data) => {
    return models_1.Reminder.create(data);
};
ReminderRepo.getAll = async (user, epoch) => {
    return models_1.Reminder.findAll({
        order: [["id", "ASC"]],
        where: {
            ...(user ? { user } : {}),
            ...(epoch ? { date: { [sequelize_1.Op.gte]: epoch } } : {}),
        },
    });
};
ReminderRepo.getOne = async (id) => {
    return models_1.Reminder.findByPk(id);
};
//# sourceMappingURL=ReminderRepo.js.map