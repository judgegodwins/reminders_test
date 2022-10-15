import ReminderRepo from "../../database/repositories/ReminderRepo";
import { CreateReminderRequest, GetReminderRequest } from "../../validators";
import { wrapServiceAction } from "../../utils/core";

export default wrapServiceAction({
  schema: GetReminderRequest,
  handler: async (params: GetReminderRequest) => {
    const data = await ReminderRepo.getAll(params.user, params.after);

    return data;
  },
});
