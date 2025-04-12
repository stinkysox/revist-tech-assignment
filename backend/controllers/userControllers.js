import User from "../models/userModel.js"; // Use correct path for user model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ email, password, username });

    // Save user to the database
    await user.save();
    console.log(`New user registered: ${username}`);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ message: "Internal server error during registration" });
  }
};

// Login User
// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token including the username
    const token = jwt.sign(
      { userId: user._id, username: user.username }, // Add username to the token payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token will expire in 1 hour
    );

    console.log(`User logged in: ${user.username}`);
    // Return the token and username
    res.json({ token, username: user.username });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};
