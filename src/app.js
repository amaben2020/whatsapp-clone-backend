import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
const app = express();

// app middlewares
// .env vars
dotenv.config();

// Morgan:  status logger
if (process.NODE_ENV !== "production") {
  // only use in development
  app.use(morgan("dev"));
}

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

export default app;
