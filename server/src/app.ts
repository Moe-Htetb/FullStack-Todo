import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import router from "./routes/route";

dotenv.config({
  path: ".env",
});

const app = express();
app.use(json());

const PORT = process.env.PORT || 4000;

app.use(router);
app.listen(PORT, () => {
  connectDB();
  console.log("server is running at PORT " + PORT);
});
