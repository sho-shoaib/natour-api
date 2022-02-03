import express from "express";
import fs from "fs";

const port = 8000;

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  const { id } = req.params;
  const mainTour = tours.filter((tour) => tour.id === +id);

  if (id > tours.length) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: mainTour,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    "./dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {}
  );

  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
