const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const AuthSanitizer = require("../middlewares/sanitizers/auth");
const AuthValidator = require("../middlewares/validators/auth");

router.post(
  "/register",
  [AuthSanitizer.registerAuthBody, AuthValidator.registerAuthBody],
  AuthController.register
);

router.post(
  "/login",
  [AuthSanitizer.loginAuthBody, AuthValidator.loginAuthBody],
  AuthController.login
);

module.exports = router;
