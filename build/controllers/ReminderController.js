"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ReminderRepo_1 = __importDefault(require("../database/repositories/ReminderRepo"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ReminderService = __importStar(require("../services/Reminder"));
class ReminderController {
}
exports.default = ReminderController;
_a = ReminderController;
ReminderController.createReminder = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await ReminderService.createReminder(req.body);
    res.status(201).json(data);
});
ReminderController.getReminders = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await ReminderService.getReminders(req.query);
    res.status(200).json(data);
});
ReminderController.getReminder = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await ReminderRepo_1.default.getOne(req.params.id);
    if (!data)
        return res.status(404).send('ID not found');
    res.status(200).json(data);
});
//# sourceMappingURL=ReminderController.js.map