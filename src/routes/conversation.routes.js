import express from "express";
import trimRequest from "trim-request";
import {
  create_open_conversation,
  getConversation,
} from "../controllers/conversation.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(trimRequest.all, authMiddleware, create_open_conversation);

router.route("/").post(trimRequest.all, authMiddleware, getConversation);

export default router;
