import { ConversationModel } from "../../models/index.js";

export const getUserConversations = async (userId) => {
  const convo = await ConversationModel.find({
    isGroup: false,
    // filtering array data in mongoose
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "-password")
    .populate("latestMessage")
    .populate("admin", "-password");
  // .find({
  //   _id: {
  //     // not equal: gives every other field except this
  //     $ne: userId,
  //   },
  // });

  console.log(convo);

  return convo;
};
