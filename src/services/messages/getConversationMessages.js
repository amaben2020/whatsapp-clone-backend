import MessageModel from "../../models/MessageModel.js";

export const getConversationMessages = async (id) => {
  try {
    const messages = await MessageModel.find({ conversation: id })
      .populate("sender", "name email picture status")
      // .populate("conversation");
      .populate({
        path: "conversation",
        model: "Conversation",
        populate: {
          path: "users",
          model: "UserModel",
          select: "-password",
        },
      });

    if (!messages) {
      throw Error("Something went wrong");
    }

    console.log("messages", messages);

    return messages;
  } catch (error) {
    console.log(error);
  }
};
