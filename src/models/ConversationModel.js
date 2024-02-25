import { default as ObjectId, default as mongoose } from "mongoose";
const ConversationSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Conversation name required"],
  },
  isGroup: {
    type: Boolean,
    required: true,
    default: false,
  },
  users: [
    {
      type: ObjectId,
      ref: "UserModel",
    },
  ],
  latestMessage: {
    type: ObjectId,
    ref: "LatestMessageModel",
  },
  admin: {
    type: ObjectId,
    ref: "UserModel",
  },
});

const ConversationModel = mongoose.model(
  "ConversationModel",
  ConversationSchema,
);

export default ConversationModel;
