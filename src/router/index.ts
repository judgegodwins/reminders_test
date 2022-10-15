import express from 'express';
import ReminderController from '../controllers/ReminderController';
import { notAllowedHandler } from '../middleware/handlers';

const router = express.Router();

router.post('/reminders', ReminderController.createReminder);
router.get('/reminders', ReminderController.getReminders);
router
  .route('/reminders/:id')
  .get(ReminderController.getReminder)
  .put(notAllowedHandler)
  .patch(notAllowedHandler)
  .delete(notAllowedHandler);

export default router;