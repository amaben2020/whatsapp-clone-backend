import pkg from "http-errors";
import jwt from "jsonwebtoken";
const { createHttpError } = pkg;

export const generateToken = async (payload, secret, expiry) => {
  // payload: an object that represents the data to be sent to client as token
  try {
    let token = await jwt.sign(payload, secret, { expiresIn: expiry });

    return token;
  } catch (error) {
    throw createHttpError.BadRequest(error);
  }
};
