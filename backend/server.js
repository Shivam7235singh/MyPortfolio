import dotenv from "dotenv"; 
import express from "express";
dotenv.config(); 

import { app } from "./app.js";
import cloudinary from "cloudinary";
import cors from "cors";
import { connectDatabase } from "./config/database.js";
import path from "path";

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));



// Connect to Database
connectDatabase();

const _dirname = path.resolve();

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) =>{ 
  res.sendFile(path.resolve(_dirname, "frontend" ,"dist", "index.html"))
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
});
