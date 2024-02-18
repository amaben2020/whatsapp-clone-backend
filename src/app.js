import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressFileUpload from "express-fileupload";
import mongoSanitize from "express-mongo-sanitize";
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

// parsing without body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// sanitizing mongodb queries
app.use(mongoSanitize());

// cookie parser for cookies during auth
app.use(cookieParser());

// compression is a method of compressing files (such as HTML, CSS, and JavaScript) to reduce their size before they are sent to the browser: This will make your JSON response and other static file responses smaller.
app.use(compression());

// to upload files easily to database
app.use(
  expressFileUpload({
    useTempFiles: true,
  }),
);

// using cors to prevent unauthorized clients
app.use(
  cors({
    origin: "http:localhost:5173",
  }),
);
// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

export default app;
