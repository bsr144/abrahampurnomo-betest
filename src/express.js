const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

const app = express();
const routes = require("./routes");

const { handleError } = require("./utils/error/error");

app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  windowMs: process.env.API_HIT_TIME_LIMIT_MILISECONDS,
  max: process.env.API_HIT_LIMIT,
});
app.use(limiter);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use("/api/v1", routes);
app.use((err, req, res, next) => {
  handleError(err, req, res, next);
});

module.exports = app;
