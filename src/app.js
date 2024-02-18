import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
const app = express();

// app middlewares
// .env vars
dotenv.config();

// invoking middlewares (you could chain them) app.use().helmet().....
// Morgan:  status logger
if (process.NODE_ENV !== "production") {
  // only use in development
  app.use(morgan("dev"));
}

// helmet for security
app.use(helmet());

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

export default app;
