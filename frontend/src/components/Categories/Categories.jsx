import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState({
    name: "",
    items: "",
    imageUrl: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/get-categories"
        );
        const categoriesData = Array.isArray(response.data.categories)
          ? response.data.categories
          : [];

        if (categoriesData.length === 0) {
          setError("No categories found");
        } else {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError("Failed to fetch categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleEditClick = (category) => {
    setEditCategory(category);
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/edit-category/${editCategory._id}`,
        editCategory
      );

      if (response.status === 200) {
        const updatedCategories = categories.map((category) =>
          category._id === editCategory._id ? response.data.category : category
        );
        setCategories(updatedCategories);
        setEditMode(false);
      } else {
        setError("Failed to save category. Please try again.");
      }
    } catch (error) {
      console.error("Failed to save category:", error);
      setError("Failed to save category. Please try again later.");
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditCategory({
      name: "",
      items: "",
      imageUrl: "",
    });
  };

  if (loading) {
    return <p className="loading-text">Loading categories...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="categories">
      <div className="categories-top-container">
        <h2>Categories</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/categories/add")}
        >
          Add Category
        </button>
      </div>

      {editMode ? (
        <div className="edit-category-form">
          <h3>Edit Category</h3>
          <input
            type="text"
            name="name"
            value={editCategory.name}
            onChange={handleChange}
            placeholder="Category Name"
          />
          <input
            type="number"
            name="items"
            value={editCategory.items}
            onChange={handleChange}
            placeholder="Item Count"
          />
          <input
            type="text"
            name="imageUrl"
            value={editCategory.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category._id} className="category-card">
              <div className="category-image">
                <img src={category.imageUrl} alt={category.name} />
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>
              </div>
              <div className="category-info">
                <h4>{category.name}</h4>
                <p>{category.items} items</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
