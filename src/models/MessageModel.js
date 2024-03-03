import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const MessageModel = mongoose.Schema({
  sender: {
    type: ObjectId,
    ref: "UserModel",
  },
});
