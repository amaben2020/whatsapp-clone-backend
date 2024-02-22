export const register = async (req, res, next) => {
  try {
    const newUser = {};
    const access_token = genToken({
      userId: newUser._id,
      expiry: "1d",
      secret: process.env.ACCESS_TOKEN_SECRET,
    });

    const refresh_token = genToken({
      userId: newUser._id,
      expiry: "30d",
      secret: process.env.REFRESH_TOKEN_SECRET,
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
