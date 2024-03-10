import { UserModel } from "../../models/index.js";

export const searchUsers = async (userData, id) => {
  const users = UserModel.find({
    name: { $regex: userData, $options: "i" },
  });

  console.log("USERS", users);

  return users;
};
