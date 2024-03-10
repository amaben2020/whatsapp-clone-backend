import { searchUsers } from "../services/user/searchUsers.js";

export const getUsers = async (req, res, next) => {
  const userData = req.query.search;
  const id = req.user;
  // create a search users by email or name service

  const users = await searchUsers(userData, id);

  // use regex to search for the users

  // exclude the user id

  console.log("userData", userData);

  res.json(users);
};
