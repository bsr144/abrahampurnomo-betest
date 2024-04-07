class GetUserByAccountNumberDTO {
  constructor({ id }, { accountNumber }) {
    this.requestor_id = id;
    this.accountNumber = accountNumber;
  }
}

class GetUserByIdentityNumberDTO {
  constructor({ id }, { identityNumber }) {
    this.requestor_id = id;
    this.identityNumber = identityNumber;
  }
}

class UpdateUserDTO {
  constructor(
    id,
    requestor_id,
    { username, password, email, accountNumber, identityNumber }
  ) {
    this.id = id;
    this.requestor_id = requestor_id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.accountNumber = accountNumber;
    this.identityNumber = identityNumber;
  }
}

class DeleteUserDTO {
  constructor(id, requestor_id) {
    this.id = id;
    this.requestor_id = requestor_id;
  }
}

module.exports = {
  GetUserByAccountNumberDTO,
  GetUserByIdentityNumberDTO,
  UpdateUserDTO,
  DeleteUserDTO,
};
