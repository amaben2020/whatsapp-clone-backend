import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressFileUpload from "express-fileupload";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import morgan from "morgan";
import { logger } from "./configs/logger.js";
import routes from "./routes/index.js";

const app = express();

// app middlewares: It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.

// .env vars
dotenv.config();
const { MONGODB_URL } = process.env;

// exit on mongodb error
mongoose.connection.on("error", (error) => {
  logger.error(`Connection ended due to ${error}`);
  process.exit(1);
});

// establishing async connection with mongodb
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected successfully to MongoDB ✅");
  })
  .catch(() => {
    logger.error("Connection to MongoDB failed ❌");
  });

// invoking middlewares (you could chain them) app.use().helmet().....
// Morgan:  status logger
if (process.NODE_ENV !== "production") {
  // only use in development
  app.use(morgan("dev"));
}

// helmet for security
app.use(helmet());

// parsing the incoming Request Object without body parser
app.use(express.json());

// recognizes the incoming Request Object as strings or arrays
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// cookie parser for cookies during auth
app.use(cookieParser());

// sanitizing mongodb queries
app.use(mongoSanitize());

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

// formatting http based errors
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);

  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.post("/test", () => {
  throw createHttpError.BadRequest("There was an error");
});

export default app;
