const mongoose = require("mongoose");

let databaseConnection;

const connectDB = async () => {
  if (databaseConnection) {
    return;
  }

  try {
    console.log(
      `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );
    const conn = await mongoose.connect(
      `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );
    databaseConnection = conn.connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  }
};

const closeDB = async () => {
  if (!databaseConnection) {
    console.log("No DB connection to close.");
    return;
  }

  try {
    await mongoose.disconnect();
    console.log("DB connection closed.");
  } catch (error) {
    console.error("Error closing DB connection:", error.message);
    throw error;
  } finally {
    databaseConnection = null;
  }
};

module.exports = { connectDB, closeDB };
