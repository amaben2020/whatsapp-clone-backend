import { ConversationModel, UserModel } from "./../../models/index.js";

export const doesConvoExist = async (senderId, receiverId) => {
  // check conversation model users if these 2 already have a convo

  let convos;
  convos = await ConversationModel.find({
    isGroup: false,
    $and: [
      {
        users: {
          $elemMatch: { $eq: senderId },
        },

        users: {
          $elemMatch: { $eq: receiverId },
        },
      },
    ],
  }).populate("users", "-password");

  // population based on 2 models, wow
  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "email name picture status",
  });

  return convos[0];
};
