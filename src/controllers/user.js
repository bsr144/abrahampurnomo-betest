const UserService = require("../services/user");
const {
  GetUserByAccountNumberDTO,
  GetUserByIdentityNumberDTO,
  UpdateUserDTO,
  DeleteUserDTO,
} = require("../dto/request/user");
const { validationResult } = require("express-validator");
const { successResponse } = require("../utils/response/http");
const { JeniusError } = require("../utils/error/error");
const { GetUserResponseDTO } = require("../dto/response/user");

class UserController {
  async getByAccountNumber(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new JeniusError(errors.array()[0].msg, 400);
      }

      const getDTO = new GetUserByAccountNumberDTO(req.user, req.params);
      const user = await UserService.getByAccountNumber(getDTO);
      if (!user) {
        throw new JeniusError("user not found", 404);
      }
      const responseDTO = new GetUserResponseDTO(user);
      res.status(201).json(successResponse(200, "success", responseDTO));
    } catch (error) {
      next(error);
    }
  }

  async getByIdentityNumber(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new JeniusError(errors.array()[0].msg, 400);
      }

      const getDTO = new GetUserByIdentityNumberDTO(req.user, req.params);
      const user = await UserService.getByIdentityNumber(getDTO);
      if (!user) {
        throw new JeniusError("user not found", 404);
      }
      const responseDTO = new GetUserResponseDTO(user);
      res.status(201).json(successResponse(200, "success", responseDTO));
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const requestorId = req.user.id;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new JeniusError(errors.array()[0].msg, 400);
      }

      const updateDTO = new UpdateUserDTO(userId, requestorId, req.body);
      const user = await UserService.updateUser(updateDTO);
      const responseDTO = new GetUserResponseDTO(user);
      res
        .status(200)
        .json(successResponse(200, "user successfully updated", responseDTO));
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;
      const requestorId = req.user.id;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new JeniusError(errors.array()[0].msg, 400);
      }

      const deleteDTO = new DeleteUserDTO(userId, requestorId);

      await UserService.deleteUser(deleteDTO);
      res.status(200).json(successResponse(200, "user successfully deleted"));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
