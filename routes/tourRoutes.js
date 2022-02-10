import express from "express";
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} from "./../controllers/tourController.js";

export const router = express.Router();

//router.param("id", checkID);

router.route("/top-5-tours").get(aliasTopTours, getAllTours);

router
  .route("/")
  .get(getAllTours)
  .post(createTour);

router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
