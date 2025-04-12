import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  // Each user must have a unique email
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

// Step 2: Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified("password")) {
    return next(); // move to the next middleware
  }

  try {
    // Generate a hashed version of the password using bcrypt
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next(); // move to the next middleware or save
  } catch (error) {
    // If error occurs during hashing, pass it to the next middleware
    next(error);
  }
});

// Step 3: Add a custom method to compare entered password with the hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    // Compare entered password with the hashed password stored in DB
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Step 4: Create and export the User model
const User = mongoose.model("User", userSchema);

export default User;
