"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReminderRepo_1 = __importDefault(require("../../database/repositories/ReminderRepo"));
const validators_1 = require("../../validators");
const core_1 = require("../../utils/core");
exports.default = (0, core_1.wrapServiceAction)({
    schema: validators_1.GetReminderRequest,
    handler: async (params) => {
        const data = await ReminderRepo_1.default.getAll(params.user, params.after);
        return data;
    },
});
//# sourceMappingURL=getReminders.js.map