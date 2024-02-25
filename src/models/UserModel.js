import bcrypt from "bcrypt";
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
      default: "https://via.placeholder.com/350x150",
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

// enables hashing the password without doing it in a separate file
UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);

      const hashedPwd = await bcrypt.hash(this.password, salt);

      this.password = hashedPwd;
    }
    next(); // saves the new user to db
  } catch (error) {
    throw new Error(error);
  }
});

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;
