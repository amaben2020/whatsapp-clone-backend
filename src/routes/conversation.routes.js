import express from "express";
import trimRequest from "trim-request";

const router = express.Router();

router.route("/").post(trimRequest.all, () => {});

export default router;
