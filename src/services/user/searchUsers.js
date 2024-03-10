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
  })
    .find({
      _id: {
        // not equal: gives every other field except this
        $ne: id,
      },
    })
    // select just chooses or removes certain props
    .select("-password");

  console.log("USERS", users);

  return users;
};
