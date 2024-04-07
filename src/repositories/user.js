const User = require("../models/user");
const UserEntity = require("../entities/user");
const { JeniusError } = require("../utils/error/error");

class UserRepository {
  async findByCredentials(userEntity) {
    try {
      const user = await User.findOne({
        $or: [{ username: userEntity.username }, { email: userEntity.email }],
        deletedAt: { $exists: true },
      });

      return user
        ? new UserEntity({
            id: user._id.toString(),
            username: user.username,
            password: user.password,
            accountNumber: user.accountNumber,
            email: user.email,
            identityNumber: user.identityNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
          })
        : null;
    } catch (error) {
      throw new JeniusError(`db error: ${error.message}`, 500);
    }
  }

  async findByAccountNumber(userEntity) {
    try {
      const user = await User.findOne({
        accountNumber: userEntity.accountNumber,
        deletedAt: null,
      });

      return user
        ? new UserEntity({
            id: user._id.toString(),
            username: user.username,
            password: user.password,
            accountNumber: user.accountNumber,
            email: user.email,
            identityNumber: user.identityNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
          })
        : null;
    } catch (error) {
      throw new JeniusError(`db error: ${error.message}`, 500);
    }
  }

  async findByIdentityNumber(userEntity) {
    try {
      const user = await User.findOne({
        identityNumber: userEntity.identityNumber,
        deletedAt: null,
      });

      return user
        ? new UserEntity({
            id: user._id.toString(),
            username: user.username,
            password: user.password,
            accountNumber: user.accountNumber,
            email: user.email,
            identityNumber: user.identityNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
          })
        : null;
    } catch (error) {
      throw new JeniusError(`db error: ${error.message}`, 500);
    }
  }

  async softDeleteUser(userEntity) {
    try {
      const user = await User.findByIdAndUpdate(
        userEntity.id,
        { $set: { deletedAt: new Date() } },
        { new: true }
      );
      return user
        ? new UserEntity({
            id: user._id.toString(),
            username: user.username,
            password: user.password,
            accountNumber: user.accountNumber,
            email: user.email,
            identityNumber: user.identityNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
          })
        : null;
    } catch (error) {
      throw new JeniusError(`db error: ${error.message}`, 500);
    }
  }

  async updateUser(updateDTO) {
    try {
      delete updateDTO.password;
      delete updateDTO.deletedAt;

      const user = await User.findByIdAndUpdate(
        updateDTO.id,
        { $set: updateDTO },
        { new: true }
      ).select("-id -password -deletedAt");

      return user
        ? new UserEntity({
            id: user._id.toString(),
            username: user.username,
            password: user.password,
            accountNumber: user.accountNumber,
            email: user.email,
            identityNumber: user.identityNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
          })
        : null;
    } catch (error) {
      throw new JeniusError(`db error: ${error.message}`, 500);
    }
  }

  async findUserById(userEntity) {
    try {
      const user = await User.findById(userEntity.id);
      if (!user) return null;
      return new UserEntity({
        id: user._id.toString(),
        username: user.username,
        password: user.password,
        accountNumber: user.accountNumber,
        email: user.email,
        identityNumber: user.identityNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      });
    } catch (error) {
      throw new JeniusError(`db error: ${error.message}`, 500);
    }
  }

  async createUser(userData) {
    try {
      const user = new User(userData);
      const savedUser = await user.save();
      return new UserEntity({
        id: savedUser._id.toString(),
        password: savedUser.password,
        username: savedUser.username,
        email: savedUser.email,
        accountNumber: savedUser.accountNumber,
        identityNumber: savedUser.identityNumber,
      });
    } catch (error) {
      throw new JeniusError(`db error: ${error.message}`, 500);
    }
  }
}

module.exports = new UserRepository();
