import Tour from "../models/tourModel.js";

const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingAverage,price";
  req.query.fields = "ratingAverage,name,price,summary,difficulty";
  next();
};

const getAllTours = async (req, res) => {
  try {
    var queryObj = { ...req.query };
    const excludedFeilds = ["page", "sort", "limit", "fields"];
    excludedFeilds.forEach((item) => delete queryObj[item]);

    // gte => $gte conversion
    var queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

    var toursQuery = Tour.find(queryObj);

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      toursQuery = toursQuery.sort(sortBy);
    } else {
      toursQuery = toursQuery.sort("-createdAt");
    }

    // feild limitimg
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      toursQuery = toursQuery.select(fields);
    } else {
      toursQuery = toursQuery.select("-__v");
    }

    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 3;
    const skip = (page - 1) * limit;
    toursQuery = toursQuery.skip(skip).limit(limit);
    if (req.query.page) {
      const tourCount = await Tour.countDocument();
      if (tourCount <= skip) {
        throw new Error("This page does not exist");
      }
    }

    // awaiting toursQuery
    const tours = await toursQuery;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
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

const getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

export {
  deleteTour,
  updateTour,
  createTour,
  getTour,
  getAllTours,
  aliasTopTours,
};
