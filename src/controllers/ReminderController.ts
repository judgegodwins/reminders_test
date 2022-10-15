import { CreatedResponse, SuccessResponse } from "../core/ApiResponse";
import ReminderRepo from "../database/repositories/ReminderRepo";
import asyncHandler from "../utils/asyncHandler";
import * as ReminderService from "../services/Reminder";

export default class ReminderController {
  static createReminder = asyncHandler(
    async (req, res) => {

      const data = await ReminderService.createReminder(req.body)

      res.status(201).json(data);
    }
  )

  static getReminders = asyncHandler(
    async (req, res) => {

      const data = await ReminderService.getReminders(req.query as any);

      res.status(200).json(data);
    }
  )

  static getReminder = asyncHandler(
    async (req, res) => {

      const data = await ReminderRepo.getOne(req.params.id as any);

      if (!data) return res.status(404).send('ID not found')

      res.status(200).json(data);
    }
  )
}