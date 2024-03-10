import { UserModel } from "../../models/index.js";

export const searchUsers = async (userData, id) => {
  const users = await UserModel.find({
    $or: [
      {
        email: { $regex: userData },
      },
      {
        name: { $regex: userData, $options: "i" },
      },
    ],
  }).find({
    _id: {
      // not equal
      $ne: id,
    },
  });

  console.log("USERS", users);

  return users;
};
