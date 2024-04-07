const { body } = require("express-validator");

const authValidator = {
  registerAuthBody: [
    body("username")
      .notEmpty()
      .withMessage("username is required")
      .isString()
      .withMessage("username must be a string"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isString()
      .withMessage("password must be a string")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters long")
      .matches(/\d/)
      .withMessage("password must contain at least one number")
      .matches(/[a-zA-Z]/)
      .withMessage("password must contain at least one letter")
      .matches(/\W/)
      .withMessage("password must contain at least one special character"),
    body("accountNumber")
      .notEmpty()
      .withMessage("account number is required")
      .isString()
      .withMessage("account number must be a string")
      .isLength({ min: 10, max: 10 })
      .withMessage("account number must be 10 digits long")
      .matches(/^\d{10}$/)
      .withMessage("account number must be only digits"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email address")
      .isString()
      .withMessage("email address must be a string"),
    body("identityNumber")
      .notEmpty()
      .withMessage("identity number is required")
      .isString()
      .withMessage("identity must be a string")
      .isLength({ min: 16, max: 16 })
      .withMessage("identity number must be 16 digits long")
      .matches(/^\d{16}$/)
      .withMessage("identity number must be only digits"),
  ],
  loginAuthBody: [
    body("identifier")
      .notEmpty()
      .withMessage("identifier is required")
      .isString()
      .withMessage("identifier must be a string"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isString()
      .withMessage("password must be a string"),
  ],
};

module.exports = authValidator;
