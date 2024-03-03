import MessageModel from "../../models/MessageModel.js";

export const getConversationMessages = async (id) => {
  try {
    const messages = await MessageModel.find({ conversation: id })
      .populate("sender", "name email picture status")
      .populate("conversation");

    if (!messages) {
      throw Error("Something went wrong");
    }

    return messages;
  } catch (error) {
    console.log(error);
  }
};
