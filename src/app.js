import express from "express";

const app = express();

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

export default app;
