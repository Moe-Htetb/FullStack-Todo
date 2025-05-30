import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import router from "./routes/route";
import cors from "cors";
import userRouter from "./routes/userRouter";
import errorhandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
dotenv.config({
  path: ".env",
});

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_API_URL,
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.use(router);
app.use(userRouter);
app.use(errorhandler);
app.listen(PORT, () => {
  connectDB();
  console.log("server is running at PORT " + PORT);
});
