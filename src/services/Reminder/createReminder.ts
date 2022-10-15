import ReminderRepo from "../../database/repositories/ReminderRepo";
import { CreateReminderRequest } from "../../validators";
import { wrapServiceAction } from "../../utils/core";

export default wrapServiceAction({
  schema: CreateReminderRequest,
  handler: async (params: CreateReminderRequest) => {
    const data = await ReminderRepo.create({
      ...params,
      date: new Date(params.date),
    });

    return data;
  },
});
