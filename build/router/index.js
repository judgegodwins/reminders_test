"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReminderController_1 = __importDefault(require("../controllers/ReminderController"));
const handlers_1 = require("../middleware/handlers");
const router = express_1.default.Router();
router.post('/reminders', ReminderController_1.default.createReminder);
router.get('/reminders', ReminderController_1.default.getReminders);
router
    .route('/reminders/:id')
    .get(ReminderController_1.default.getReminder)
    .put(handlers_1.notAllowedHandler)
    .patch(handlers_1.notAllowedHandler)
    .delete(handlers_1.notAllowedHandler);
exports.default = router;
//# sourceMappingURL=index.js.map