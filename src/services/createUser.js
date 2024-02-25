import pkg from "http-errors";
import validator from "validator";
import UserModel from "../models/UserModel.js";
const { createHttpError } = pkg;

export const createUser = async (newUserData) => {
  const { name, email, picture, password, status } = newUserData;

  if (
    !validator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please name should not be less than 2 characters or greater than 16 characters",
    );
  }

  if (status.length > 64) {
    throw createHttpError.BadRequest("Status should be less than 64 chars");
  }

  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Invalid email provided");
  }

  // // check if user already exists
  const user = await UserModel.create({
    name,
    email,
    picture,
    password,
    status,
  });

  return user;
};
