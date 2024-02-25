import { ConversationModel } from "../../models/index.js";

export const populateConvo = async (id, fieldToPopulate, fieldToOmit) => {
  const data = await ConversationModel.findOne({
    _id: id,
  }).populate(fieldToPopulate, fieldToOmit);

  return data;
};

console.log("populateConvo", populateConvo);
