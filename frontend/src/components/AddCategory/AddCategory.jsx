import React, { useState } from "react";
import axios from "axios";

import "./AddCategory.css";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    items: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageUrl.endsWith(".jpg")) {
      setMessage("Only .jpg image URLs are allowed.");
      return;
    }

    try {
      const response = await axios.post(
        "https://revist-backend.onrender.com/api/categories/add",
        formData
      );
      setMessage(response.data.message);
      setFormData({ name: "", imageUrl: "", items: "" });
    } catch (error) {
      console.error("Error adding category:", error);
      setMessage("Failed to add category");
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add New Category</h2>

      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
        />

        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL (.jpg format only)"
          required
        />

        <input
          type="number"
          name="items"
          value={formData.items}
          onChange={handleChange}
          placeholder="Number of Items"
          required
        />

        <button type="submit">Add Category</button>
      </form>

      <div className="external-link">
        <a
          href="https://postimages.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Convert your image to direct URL
        </a>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddCategory;
