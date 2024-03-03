import { updateLatestMessage } from "../services/conversations/updateLatestMessage.js";
import { createMessage } from "../services/messages/createMessage.js";
import { getConversationMessages } from "../services/messages/getConversationMessages.js";
import { populateMessage } from "../services/messages/populateMessage.js";
import { createHttpError } from "../utils/createHttpError.js";

export const sendMessage = async (req, res) => {
  try {
    const { files, conversation_id, message } = req.body;
    // get user id from mware
    const userId = req.user;

    if (!userId) {
      throw Error("Authentication failed!");
    }
    // throw error is no files or sender
    if (!files && !conversation_id) {
      return res.status(400);
    }
    // create msgData with the model shape
    const msgData = {
      sender: userId,
      message: message,
      conversation: conversation_id,
      files: files || [],
    };
    // create message service used for the above purpose
    const newMessage = await createMessage(msgData);
    // create a populate message service to flesh out all properties

    const populatedMessage = await populateMessage(newMessage?._id);
    await updateLatestMessage(conversation_id, newMessage);
    res.json({ message: populatedMessage });
  } catch (error) {
    console.log(error);
  }
};
export const getMessages = async (req, res) => {
  const convoId = req.params.convo_id;

  if (!convoId) {
    return createHttpError.BadRequest("Conversation id is undefined");
  }

  const conversations = await getConversationMessages(convoId);

  if (!conversations.length) {
    return createHttpError.BadRequest("Conversation id is undefined");
  }
  res.status(200).json({ messages: conversations });
};
