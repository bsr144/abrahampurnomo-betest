class RegisterRequestDTO {
  constructor({ username, password, email, accountNumber, identityNumber }) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.accountNumber = accountNumber;
    this.identityNumber = identityNumber;
  }
}

class LoginRequestDTO {
  constructor({ identifier, password }) {
    this.email = identifier;
    this.username = identifier;
    this.password = password;
  }
}
module.exports = { RegisterRequestDTO, LoginRequestDTO };
