import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "UserModel",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: ObjectId,
      ref: "ConversationModel",
    },
    files: [],
  },
  {
    collection: "messages",
    timestamps: true,
  },
);

// if a message model exists, use it, otherwise, create new one
const MessageModel =
  mongoose.models.MessageModel || mongoose.model("MessageModel", MessageSchema);

export default MessageModel;
