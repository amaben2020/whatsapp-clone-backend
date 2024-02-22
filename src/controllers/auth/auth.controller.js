import { createUser } from "../../utils/createUser";
import { generateToken } from "../../utils/generateToken";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const { name, email, picture, password, status } = req.body;
    const newUser = await createUser({
      name,
      email,
      picture,
      password,
      status,
    });
    const access_token = await generateToken(
      {
        userId: newUser._id,
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
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshToken",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    console.table(refresh_token, access_token);
    // send the user with access_token and data

    res.status(201).json({
      message: "Registration successful",
      access_token,
      user: {
        ...newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.send("Oks");
};
export const login = (req, res) => {
  res.send("Oks");
};
export const refreshToken = (req, res) => {
  res.send("Oks");
};
