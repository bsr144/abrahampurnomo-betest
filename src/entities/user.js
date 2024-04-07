class UserEntity {
  constructor({
    id,
    username,
    password,
    accountNumber,
    email,
    identityNumber,
    createdAt,
    updatedAt,
    deletedAt,
  } = {}) {
    this.id = id || null;
    this.username = username || null;
    this.password = password || null;
    this.email = email || null;
    this.accountNumber = accountNumber || null;
    this.identityNumber = identityNumber || null;
    this.createdAt = createdAt || null;
    this.updatedAt = updatedAt || null;
    this.deletedAt = deletedAt || null;
  }

  updateId(newId) {
    this.id = newId;
  }

  updateUsername(newUsername) {
    this.username = newUsername;
  }

  updateEmail(newEmail) {
    this.email = newEmail;
  }

  updatePassword(newPassword) {
    this.password = newPassword;
  }

  updateAccountNumber(newAccountNumber) {
    this.accountNumber = newAccountNumber;
  }

  updateIdentityNumber(newIdentityNumber) {
    this.identityNumber = newIdentityNumber;
  }

  updateFromDTO(dto) {
    if (dto.id) this.updateId(dto.id);
    if (dto.username) this.updateUsername(dto.username);
    if (dto.password) this.updatePassword(dto.password);
    if (dto.email) this.updateEmail(dto.email);
    if (dto.accountNumber) this.updateAccountNumber(dto.accountNumber);
    if (dto.identityNumber) this.updateIdentityNumber(dto.identityNumber);
  }

  isAuthorizedToActionedOnResource(requestorId) {
    return this.id !== requestorId;
  }
}

module.exports = UserEntity;
