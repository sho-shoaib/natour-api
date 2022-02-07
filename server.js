import mongoose from "mongoose";
import { app } from "./index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
mongoose.connect(DB);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
