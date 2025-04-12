import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    items: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String, // Field to store image URL
      required: true, // Mark this as required
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
