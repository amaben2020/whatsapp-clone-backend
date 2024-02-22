const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const newUser = {};
    const access_token = generateToken(
      {
        userId: newUser._id,
      },
      ACCESS_TOKEN_SECRET,
      "1d",
    );

    const refresh_token = genToken(
      {
        userId: newUser._id,
      },
      REFRESH_TOKEN_SECRET,
      "30d",
    );
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
