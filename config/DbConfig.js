"use server"

import mongoose from "mongoose";
const DbConnection = async () => {
    
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error.message);
  }
};

export default DbConnection;