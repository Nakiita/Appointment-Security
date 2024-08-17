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
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
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
  passwordChangedAt: Date,
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

userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  return otp;
};

// Method to compare OTP
userSchema.methods.compareOTP = function (enteredOTP) {
  return this.otp === enteredOTP && Date.now() < this.otpExpires;
};

// Method to check password history
userSchema.methods.checkPasswordHistory = async function (newPassword) {
  for (let i = 0; i < this.passwordHistory.length; i++) {
    const isMatch = await bcrypt.compare(newPassword, this.passwordHistory[i].password);
    if (isMatch) return true;
  }
  return false;
};

const Users = mongoose.model("users", userSchema);
module.exports = Users;
