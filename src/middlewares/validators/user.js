const { body, param } = require("express-validator");

const userValidator = {
  accountNumberParam: [
    param("accountNumber")
      .isString()
      .withMessage("account number param be a string")
      .isLength({ min: 10, max: 10 })
      .withMessage("account number param must be 10 digits long")
      .matches(/^\d{10}$/)
      .withMessage("account number param must be only digits"),
  ],
  identityNumberParam: [
    param("identityNumber")
      .isString()
      .withMessage("identity number param must be a string")
      .isLength({ min: 16, max: 16 })
      .withMessage("identity number param must be 16 digits long")
      .matches(/^\d{16}$/)
      .withMessage("identity number param must be only digits"),
  ],
  idParam: [
    param("id").isMongoId().withMessage("id must be a valid ObjectId."),
  ],
  updateUserBody: [
    body("username")
      .notEmpty()
      .withMessage("username is required")
      .isString()
      .withMessage("username must be a string"),
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
};

module.exports = userValidator;
