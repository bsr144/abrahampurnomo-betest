const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const UserSanitizer = require("../middlewares/sanitizers/user");
const UserValidator = require("../middlewares/validators/user");
const authenticate = require("../middlewares/authentication/auth");

router.use(authenticate);

router.get(
  "/account-number/:accountNumber",
  [UserSanitizer.accountNumberParam, UserValidator.accountNumberParam],
  UserController.getByAccountNumber
);

router.get(
  "/identity-number/:identityNumber",
  [UserSanitizer.identityNumberParam, UserValidator.identityNumberParam],
  UserController.getByIdentityNumber
);

router.put(
  "/:id",
  [
    UserSanitizer.idParam,
    UserValidator.idParam,
    UserSanitizer.updateUserBody,
    UserValidator.updateUserBody,
  ],
  UserController.updateUser
);

router.delete(
  "/:id",
  [UserSanitizer.idParam, UserValidator.idParam],
  UserController.deleteUser
);

module.exports = router;
