const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const newUser = {};
    const access_token = generateToken({
      userId: newUser._id,
      expiry: "1d",
      secret: ACCESS_TOKEN_SECRET,
    });

    const refresh_token = genToken({
      userId: newUser._id,
      expiry: "30d",
      secret: REFRESH_TOKEN_SECRET,
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
