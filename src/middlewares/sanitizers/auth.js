const { body } = require("express-validator");

const authSanitizer = {
  registerAuthBody: [
    body("name").trim().escape(),
    body("password").trim().escape(),
    body("accountNumber").trim().escape(),
    body("email").trim().escape(),
    body("identityNumber").trim().escape(),
  ],
  loginAuthBody: [
    body("username").trim().escape(),
    body("password").trim().escape(),
    body("email").trim().escape(),
  ],
};

module.exports = authSanitizer;
