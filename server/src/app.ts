import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import router from "./routes/route";
import cors from "cors";
dotenv.config({
  path: ".env",
});

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_API_URL,
  })
);
app.use(json());

const PORT = process.env.PORT || 4000;

app.use(router);
app.listen(PORT, () => {
  connectDB();
  console.log("server is running at PORT " + PORT);
});
