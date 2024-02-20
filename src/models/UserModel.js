import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide an email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [6, "Password should be at least 6 characters"],
      maxLength: [128, "Password should be at less than 128 characters"],
    },
    picture: {
      type: String,
      required: [true, "Please provide a picture"],
      default: "",
    },
    status: {
      type: String,
      default: "Hey there, i'm using whatsapp",
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", UserSchema);

export default UserModel;
