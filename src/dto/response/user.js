class GetUserResponseDTO {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.accountNumber = user.accountNumber;
    this.identityNumber = user.identityNumber;
    this.createdAt = user.createdAt ? this.formatDate(user.createdAt) : null;
    this.updatedAt = user.updatedAt ? this.formatDate(user.updatedAt) : null;
  }

  formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Jakarta",
    };

    const dt = typeof date === "string" ? new Date(date) : date;

    console.log(dt.toLocaleDateString("en-US", options));

    return dt.toLocaleDateString("en-US", options);
  }
}

module.exports = { GetUserResponseDTO };
