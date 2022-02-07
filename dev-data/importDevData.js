import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import { Tour } from "../models/tourModel.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
mongoose.connect(DB);

// read json file
const tours = JSON.parse(
  fs.readFileSync("./dev-data/data/tours-simple.json", "utf-8")
);

// import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
