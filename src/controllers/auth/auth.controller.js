import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import pkg from "http-errors";
import jwt from "jsonwebtoken";
import UserModel from "../../models/UserModel.js";
import { createUser } from "../../utils/createUser.js";
import { generateToken } from "../../utils/generateToken.js";
const { createHttpError } = pkg;
export const register = async (req, res, next) => {
  try {
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process?.env;

    const { name, email, picture, password, status } = req.body;
    console.log("Picture", picture);
    const newUser = await createUser({
      name,
      email,
      picture,
      password,
      status,
    });

    const access_token = await generateToken(
      {
        userId: newUser?._id,
      },
      ACCESS_TOKEN_SECRET,
      "1d",
    );

    const refresh_token = await generateToken(
      {
        userId: newUser._id,
      },
      REFRESH_TOKEN_SECRET,
      "30d",
    );

    // attach the refresh token to cookie
    res.cookie(
      "refreshtoken",
      refresh_token,
      // , {
      // httpOnly: true,
      // path: "/api/v1/auth/refreshToken",
      // maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      // }
    );

    // send the user with access_token and data
    res.status(201).json({
      message: "Registration successful",
      user: {
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
        token: access_token,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).lean();

  // check if password matched
  const isUserPassword = await bcrypt.compare(password, user?.password);

  if (!user) {
    res.send("User does not exist");
  }

  if (!isUserPassword) {
    res.send("Password incorrect");
  }

  if (!isUserPassword || !user) {
    throw createHttpError.BadRequest("User does not exist");
  }

  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process?.env;

  const access_token = await generateToken(
    {
      userId: user?._id,
    },
    ACCESS_TOKEN_SECRET,
    "1d",
  );

  const refresh_token = await generateToken(
    {
      userId: user?._id,
    },
    REFRESH_TOKEN_SECRET,
    "30d",
  );
  console.log("refreshtoken", refresh_token);
  // attach the refresh token to cookie
  res.cookie(
    "refreshtoken",
    refresh_token,

    // , {
    // httpOnly: true,
    // path: "/api/v1/auth/refreshToken",
    // secure: process.env.NODE_ENV !== "development",
    // maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    // }
  );

  res.status(200).json({
    message: "User login successful",

    user: {
      name: user?.name,
      email: user?.email,
      picture: user?.picture,
      status: user?.status,
      token: access_token,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshtoken", {
    path: "/api/v1/auth/refreshToken",
  });

  res.json({
    message: "Logout successful",
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  // grab the refresh token from cookie

  const refreshTokenInCookie = req.cookies["refreshtoken"];
  let userId = "";
  jwt.verify(
    refreshTokenInCookie,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log("Error", err);
      } else {
        userId = decoded.userId;
      }
    },
  );

  console.log("userId", userId);
  const userInDB = await UserModel.findOne({ _id: userId });

  const access_token = await generateToken(
    {
      userId: userInDB?._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    "1d",
  );

  res.json({
    message: "Token refresh successful",
    user: {
      name: userInDB?.name,
      email: userInDB?.email,
      picture: userInDB?.picture,
      status: userInDB?.status,
      token: access_token,
    },
  });

  // send to the client the cookie and user data
});

export const test = (req, res) => {
  console.log(req.user);
  res.send("ok");
};
