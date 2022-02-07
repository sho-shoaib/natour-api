import express from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  addUser,
} from "./../controllers/userController.js";

export const router = express.Router();

// ROUTES
router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
