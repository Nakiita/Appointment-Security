const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = mongoose.Schema({
  profilePicture: {
    type: String,
    default: null,
  },
  UserName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  previousPasswords: [{
    password: {
      type: String,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    }
  }],
  address: {
    type: String,
    default: null,  
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: "",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
userSchema.add({
  lastLogin: { type: Date },
  loginAttempts: { type: Number, default: 0 }
});

const Users = mongoose.model("users", userSchema);
module.exports = Users;
