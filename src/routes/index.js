import express from "express";
import authRoutes from "./auth.routes.js";
import conversationRoutes from "./conversation.routes.js";
const router = express.Router();

// all resources and endpoints here
router.use("/auth", authRoutes);
router.use("/conversations", conversationRoutes);

export default router;
