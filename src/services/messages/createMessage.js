import MessageModel from "../../models/MessageModel.js";

export const createMessage = async (data) => {
  try {
    const createdMessage = await MessageModel.create(data);

    if (!createdMessage._id) {
      throw Error("Something went wrong");
    }

    return createdMessage;
  } catch (error) {}
};
