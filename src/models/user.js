const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password address is required"],
    },
    email: {
      type: String,
      required: [true, "email address is required"],
      unique: true,
    },
    accountNumber: {
      type: String,
      required: [true, "account number is required"],
      unique: true,
    },
    identityNumber: {
      type: String,
      required: [true, "identity number is required"],
      unique: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.index({
  username: 1,
  accountNumber: 1,
  email: 1,
  identityNumber: 1,
});

module.exports = mongoose.model("User", userSchema);
