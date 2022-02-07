// import fs from "fs";
import { Tour } from "../models/tourModel.js";

// const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

// ROUTE HANDLERS
const getAllTours = async (req, res) => {
  try {
    // query build
    const queryObj = { ...req.query };
    const excludedFeilds = ["page", "sort", "limit", "fields"];
    excludedFeilds.forEach((el) => delete queryObj[el]);

    // gte, lte, lt, gt => $gte,... filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // get all data from model
    // const tours = await Tour.find();

    // query passing - 1
    const toursQuery = Tour.find(JSON.parse(queryStr));
    // { difficulty: "easy", duration: { gte: 5 } } --- queryObj
    // { difficulty: "easy", duration: { $gte: 5 } } --- queryObj needed by mongoose

    // query passing - 2
    // await Tour.find().where("duration").equals(5).where("price").equals(500)

    // query execute
    const tours = await toursQuery;

    // send response
    res.status(200).json({
      status: "success",
      dataLength: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
const getOneTour = async (req, res) => {
  try {
    const { id } = req.params;
    const mainTour = await Tour.findById(id);
    // Tour.findOne({ _id: id })

    res.status(200).json({
      status: "success",
      data: {
        tour: mainTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "invalid id",
    });
  }
};
const addTour = async (req, res) => {
  try {
    // 1st way
    // const newTour = new Tour({})
    // newTour.save()

    // 2nd way
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "invalid data sent",
    });
  }
};
const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // makes sure schema rules are followed
    });

    res.status(200).json({
      status: "success",
      tour: updatedTour,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "invalid data sent",
    });
  }
};
const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      message: "Tour deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "invalid id sent",
    });
  }
};

export { getAllTours, getOneTour, deleteTour, updateTour, addTour };
