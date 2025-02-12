import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

export const app = express();

// Middleware setup
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Importing user-related routes
import { userRouter } from "./routes/User.js";
app.use("/api/v1", userRouter);

// Serving static files for React frontend
app.use(express.static(path.resolve("./frontend/build")));

// Handling all other routes to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./frontend/build/index.html"));
});
