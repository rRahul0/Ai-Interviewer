import mongoose from "mongoose";

async function connectDB() {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DATABASE_URL);

    connection.isConnected = db.connections[0].readyState;

    console.log("Database is connected successfully!");
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1);
  }
}

export default connectDB;