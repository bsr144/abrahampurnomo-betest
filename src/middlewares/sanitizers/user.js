const { body, param } = require("express-validator");

const userSanitizer = {
  accountNumberParam: [param("accountNumber").trim().escape()],
  identityNumberParam: [param("identityNumber").trim().escape()],
  idParam: [param("id").trim().escape()],
  updateUserBody: [
    body("name").trim().escape(),
    body("accountNumber").trim().escape(),
    body("email").trim().escape(),
    body("identityNumber").trim().escape(),
  ],
};

module.exports = userSanitizer;
