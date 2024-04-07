const AuthService = require("../services/auth");
const { RegisterRequestDTO, LoginRequestDTO } = require("../dto/request/auth");
const { validationResult } = require("express-validator");
const { successResponse } = require("../utils/response/http");
const { JeniusError } = require("../utils/error/error");
const jwt = require("jsonwebtoken");

class AuthController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new JeniusError(errors.array()[0].msg, 400);
      }
      const registerDTO = new RegisterRequestDTO(req.body);
      await AuthService.registerUser(registerDTO);
      res.status(201).json(successResponse(201, "user successfully created"));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const loginDTO = new LoginRequestDTO(req.body);

      const user = await AuthService.authenticateUser(loginDTO);

      if (user) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        });

        res
          .status(200)
          .json(successResponse(201, "login success", { access_token: token }));
      } else {
        throw new JeniusError("login failed", 401);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
