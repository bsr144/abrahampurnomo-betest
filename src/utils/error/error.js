class JeniusError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "something is wrong with the server";

  // If in development environment, send error stack trace
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      status: statusCode,
      message: message,
      trace: err.stack
        .split("\n")
        .slice(0, 3)
        .map((eachErrStack) => eachErrStack.trim()),
    });
  }

  // For other environments, send a generic error message
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
};

module.exports = {
  JeniusError,
  handleError,
};
