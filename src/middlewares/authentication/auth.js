const jwt = require("jsonwebtoken");
const { JeniusError } = require("../../utils/error/error");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return next(new JeniusError("token not provided", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new JeniusError("failed to authenticate token", 401));
    }
    req.user = user;
    next();
  });
};

module.exports = authenticate;
