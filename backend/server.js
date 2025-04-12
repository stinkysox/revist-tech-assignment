import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser, loginUser } from "./controllers/userControllers.js"; // use correct path
import {
  addCategory,
  getAllCategories,
  updateCategory,
} from "./controllers/CategoriesController.js";
import { connectDB } from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// User Routes
app.post("/api/users/register", registerUser);
app.post("/api/users/login", loginUser);
app.post("/api/categories/add", addCategory);
app.post("/api/get-categories", getAllCategories);
app.put("/api/edit-category/:id", updateCategory);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Start server
app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
