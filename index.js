import express from "express";
import morgan from "morgan";
import { router as tourRouter } from "./routes/tourRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";

export const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));

// ROUTER SETUP
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// SERVER
