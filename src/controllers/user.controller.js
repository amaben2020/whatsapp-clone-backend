import { searchUsers } from "../services/user/searchUsers.js";

export const getUsers = async (req, res, next) => {
  const userData = req.query.search;
  const id = req.user;

  if (userData.length > 0) {
    const users = await searchUsers(userData, id);

    res.json(users ?? []);
  } else {
    res.json([]);
  }
};
