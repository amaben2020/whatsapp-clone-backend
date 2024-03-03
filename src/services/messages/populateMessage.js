import MessageModel from "../../models/MessageModel.js";

export const populateMessage = async (id) => {
  try {
    // get the message document by id
    const msg = await MessageModel.findById(id)
      .populate({
        path: "sender",
        select: "name picture",
        model: "UserModel", // this is the ref of the sender
      })
      .populate({
        path: "conversation",
        select: "name isGroup",
        model: "Conversation",
        populate: {
          path: "users",
          select: "name email picture status",
          model: "UserModel",
        },
      });

    if (!msg) throw new Error("Message is not defined");

    return msg;
  } catch (error) {
    console.log(error);
  }
};
