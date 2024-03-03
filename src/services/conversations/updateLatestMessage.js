import { ConversationModel } from "../../models/index.js";

// this basically updates a conversation with the message
export const updateLatestMessage = async (id, message) => {
  try {
    const updatedConversation = await ConversationModel.findByIdAndUpdate(id, {
      latestMessage: message,
    });

    if (!updatedConversation) {
      throw new Error("updatedConversation not found");
    }
  } catch (error) {
    console.log("Error", error);
  }
};
