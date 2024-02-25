import createHttpError from "http-errors";
import ConversationModel from "../models/ConversationModel.js";
import UserModel from "../models/UserModel.js";
import { doesConvoExist } from "../services/conversations/doesConvoExist.js";
import { populateConvo } from "../services/conversations/populateConvo.js";
// this is a private convo i.e message between 2 users
export const create_open_conversation = async (req, res, next) => {
  try {
    // get the sender and receiver ids

    const senderId = req.user;
    const receiverId = req.body.receiver_id;

    if (!receiverId) {
      throw createHttpError.HttpError("Receiver Id is missing!");
    }

    // check if the convo exists for the 2 users
    const convoExists = await doesConvoExist(senderId, receiverId);

    const populatedConvos = await populateConvo(
      convoExists._id,
      "users",
      "-password",
    );

    if (!convoExists.length > 0) {
      // create a new convo
      const receiver = await UserModel.findOne({ _id: receiverId });

      let convoData = {
        name: receiver?.name,
        users: [senderId, receiverId],
        isGroup: false,
      };

      const createNewConvo = await ConversationModel.create({
        ...convoData,
      });
      // populate it with users and password
      const populatedNewlyCreatedConvos = await populateConvo(
        createNewConvo._id,
        "users",
        "-password",
      );

      return res.status(200).json(populatedNewlyCreatedConvos);
    } else {
      // send the convo to client
      return res.status(200).json(populatedConvos);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversation = async () => {};
