import express from "express";
import trimRequest from "trim-request";
import { getUsers } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(authMiddleware, trimRequest.all, getUsers);

export default router;
