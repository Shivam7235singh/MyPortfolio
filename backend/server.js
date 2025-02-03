import dotenv from "dotenv"; 
dotenv.config({ path: "./config/config.env" }); // Load environment variables

import { app } from "./app.js";
import cloudinary from "cloudinary";
import cors from "cors";
import { connectDatabase } from "./config/database.js";

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

// Ensure MongoDB URI is Loaded
console.log("MONGO_URL:", process.env.MONGO_URL); // Debugging step

// Connect to Database
connectDatabase();

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
});
