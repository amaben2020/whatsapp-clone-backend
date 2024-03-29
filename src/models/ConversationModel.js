import { Schema, default as mongoose } from "mongoose";
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
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
  ],
  latestMessage: {
    type: Schema.Types.ObjectId,
    ref: "MessageModel",
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
  },
});

const ConversationModel = mongoose.model("Conversation", ConversationSchema);

export default ConversationModel;
