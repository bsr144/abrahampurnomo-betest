const UserEntity = require("../entities/user");
const UserRepository = require("../repositories/user");
const redisClient = require("../config/redis");
const { JeniusError } = require("../utils/error/error");

class UserService {
  async getByAccountNumber(getDTO) {
    const cacheKey = `user:accountNumber:${getDTO.accountNumber}`;
    const cachedUser = await redisClient.get(cacheKey);
    if (cachedUser) return JSON.parse(cachedUser);

    const userEntity = new UserEntity();
    userEntity.updateFromDTO(getDTO);

    const user = await UserRepository.findByAccountNumber(userEntity);
    if (!user) {
      throw new JeniusError("user not found", 404);
    }
    if (user.isAuthorizedToActionedOnResource(getDTO.requestor_id)) {
      throw new JeniusError("not authorized", 401);
    }

    await redisClient.set(
      cacheKey,
      JSON.stringify(user),
      "EX",
      process.env.REDIS_EXPIRY_TIME
    );
    return user;
  }

  async getByIdentityNumber(getDTO) {
    const cacheKey = `user:identityNumber:${getDTO.identityNumber}`;
    const cachedUser = await redisClient.get(cacheKey);
    if (cachedUser) return JSON.parse(cachedUser);

    const userEntity = new UserEntity();
    userEntity.updateFromDTO(getDTO);

    const user = await UserRepository.findByIdentityNumber(userEntity);
    if (!user) {
      throw new JeniusError("user not found", 404);
    }
    if (user.isAuthorizedToActionedOnResource(getDTO.requestor_id)) {
      throw new JeniusError("not authorized", 401);
    }

    await redisClient.set(
      cacheKey,
      JSON.stringify(user),
      "EX",
      process.env.REDIS_EXPIRY_TIME
    );
    return user;
  }

  async updateUser(updateDTO) {
    const userEntity = new UserEntity();
    userEntity.updateFromDTO(updateDTO);

    if (userEntity.isAuthorizedToActionedOnResource(updateDTO.requestor_id)) {
      throw new JeniusError("not authorized", 401);
    }

    const user = await UserRepository.updateUser(userEntity);
    if (!user) {
      throw new JeniusError("user not found", 404);
    }

    await redisClient.del(`user:accountNumber:${updateDTO.accountNumber}`);
    await redisClient.del(`user:identityNumber:${updateDTO.identityNumber}`);

    return user;
  }

  async deleteUser(deleteDTO) {
    const userEntity = new UserEntity();
    userEntity.updateFromDTO(deleteDTO);

    if (userEntity.isAuthorizedToActionedOnResource(deleteDTO.requestor_id)) {
      throw new JeniusError("not authorized", 401);
    }

    const user = await UserRepository.softDeleteUser(deleteDTO);
    if (!user) {
      throw new JeniusError("user not found", 404);
    }

    await redisClient.del(`user:accountNumber:${user.accountNumber}`);
    await redisClient.del(`user:identityNumber:${user.identityNumber}`);
    return user;
  }
}

module.exports = new UserService();
