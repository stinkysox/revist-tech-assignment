import Category from "../models/CategoriesModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log("Hello");
    console.log(categories);
    res.status(200).json({ categories }); // wrapped inside an object
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error while fetching categories" });
  }
};

export const addCategory = async (req, res) => {
  const { name, items, imageUrl } = req.body; // Destructure imageUrl from the request body

  try {
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create and save the new category with imageUrl
    const newCategory = new Category({
      name,
      items,
      imageUrl, // Include imageUrl here
    });
    await newCategory.save();

    res.status(201).json({ message: "Category created successfully!" });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Error creating category" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, items, imageUrl } = req.body; // New values from the request body

  try {
    // Find the category by ID and update it
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, items, imageUrl },
      { new: true } // This option returns the updated document
    );

    // If no category was found
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Respond with the updated category
    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Server error while updating category" });
  }
};
