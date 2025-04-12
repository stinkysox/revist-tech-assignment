import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://tarsinterstellar010:LHUJg3WOMUUTAqC1@cluster0.ftpsgbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => console.log("Database Connected"))
    .catch((error) => console.error("Database connection failed", error));
};
