import express from "express";
import {
  getAllTours,
  addTour,
  getOneTour,
  updateTour,
  deleteTour,
} from "./../controllers/tourController.js";

export const router = express.Router();
// run this middleware only if there is an param of id
// router.param("id", checkId);

// ROUTES
router.route("/").get(getAllTours).post(addTour);
router.route("/:id").get(getOneTour).patch(updateTour).delete(deleteTour);
