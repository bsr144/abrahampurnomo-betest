require("dotenv").config();

const app = require("./src/express");
const database = require("./src/config/mongoose");
const redisClient = require("./src/config/redis");
const port = process.env.APP_PORT || 3000;

(async () => {
  console.log(process.env.NODE_ENV);
  try {
    const server = app.listen(port, () => {
      database.connectDB();
      console.log(`Server is running on port ${port}`);
    });

    process.on("SIGINT", async () => {
      console.log(
        "Received SIGINT. Closing server and disconnecting from database..."
      );
      server.close(async () => {
        console.log("Express server closed.");
        redisClient.disconnect();
        console.log("Redis is disconnected");
        database.closeDB();
        console.log("Disconnected from database.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
})();
