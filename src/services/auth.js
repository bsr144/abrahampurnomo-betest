const UserEntity = require("../entities/user");
const UserRepository = require("../repositories/user");
const bcrypt = require("bcrypt");
const { JeniusError } = require("../utils/error/error");

class AuthService {
  async registerUser(registerDTO) {
    const userEntity = new UserEntity();
    userEntity.updateFromDTO(registerDTO);

    const existingUser = await UserRepository.findByCredentials(userEntity);
    if (existingUser && existingUser.deletedAt == null) {
      throw new JeniusError("user already exists", 400);
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    userEntity.password = await bcrypt.hash(userEntity.password, salt);

    return UserRepository.createUser(userEntity);
  }

  async authenticateUser(loginDTO) {
    const user = await UserRepository.findByCredentials(loginDTO);

    if (!user || user.deletedAt) {
      throw new JeniusError("user does not exists", 400);
    }

    const isMatch = await bcrypt.compare(loginDTO.password, user.password);
    if (!isMatch) {
      throw new JeniusError("authentication failed", 400);
    }

    return user;
  }
}

module.exports = new AuthService();
