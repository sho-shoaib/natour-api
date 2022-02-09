import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { app } from "./app.js";
import mongoose from "mongoose";

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
mongoose.connect(DB);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
