import { createHttpError } from "http-errors";
import validator from "validator";

export const createUser = (newUserData) => {
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
};
