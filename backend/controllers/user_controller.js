const Users = require("../model/user_model");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../middleware/sendMail");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const generateToken = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const MAX_LOGIN_ATTEMPTS = 3; // Set max login attempts
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes lockout duration
const CryptoJS = require("crypto-js");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
  }
};

const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(data, process.env.ENCRYPTION_KEY).toString();
  return ciphertext;
};

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.ENCRYPTION_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

const createUser = async (req, res) => {
  const { UserName, email, phoneNumber, password, confirmPassword } = req.body;

  // Validate incoming data
  if (!UserName || !email || !phoneNumber || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the fields.",
    });
  }

  // Ensure passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match.",
    });
  }

  try {
    const encryptedPhoneNumber = encryptData(phoneNumber);

    // Check if the user already exists
    const existingUser = await Users.findOne({ email});
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Hash the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new Users({
      UserName: UserName,
      email: email,
      phoneNumber: encryptedPhoneNumber,
      password: encryptedPassword,
      confirmPassword: encryptedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "User registered successfully.",
    });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;


  // Validate input
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields.",
    });
  }

  try {

    const user = await Users.findOne({ email: email});
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist.",
      });
    }

    const databasePassword = user.password;
    const isMatched = await bcrypt.compare(password, databasePassword);


    if (!isMatched) {
      return res.json({
        success: false,
        message: "Please enter valid password.",
      });
    }

    const passwordAge = Date.now() - (user.passwordChangedAt?.getTime() || 0);
    const MAX_PASSWORD_AGE = 90 * 24 * 60 * 60 * 1000; // 90 days
    if (passwordAge > MAX_PASSWORD_AGE) {
      return res.status(403).json({
        success: false,
        message: "Password expired. Please change your password.",
      });
    }

    // Check if the user is locked out
    if (user.lockoutExpires && user.lockoutExpires > Date.now()) {
      const remainingTimeInSeconds = Math.max(0, Math.ceil((user.lockoutExpires - Date.now()) / 1000));
      const minutes = Math.floor(remainingTimeInSeconds / 60);
      const seconds = remainingTimeInSeconds % 60;
      return res.json({
        success: false,
        message: `Account locked. Try again later in ${minutes} minute(s) and ${seconds} second(s).`
      });
    }

    user.loginAttempts = 0;
    user.lockoutExpires = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    req.session.email = user.email;

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token: token,
      userData: user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.json({
      success: false,
      message: "Server Error",
      error: error,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email not found.",
      });
    }
    if (user.is_verified === 0) {
      return res.json({
        success: false,
        message: "Please verify your email first.",
      });
    }
    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    // Assuming you have a configuration variable for the frontend URL
    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const resetUrl = `${frontendBaseUrl}/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await Users.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    const isOldPassword = await bcrypt.compare(req.body.password, user.password);

    if (isOldPassword) {
      return res.status(400).json({
        success: false,
        message: "You cannot reuse a recent password.",
      });
    }

    const newPassword = await securePassword(req.body.password);

    user.previousPasswords.push({ password: user.password });
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.passwordChangedAt = new Date();

    if (user.previousPasswords.length > 5) {
      user.previousPasswords.shift();
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getUsers = async (req, res) => {
  try {
    const allUsers = await Users.find({});
    res.json({
      success: true,
      message: "Users fetched successfully",
      users: allUsers,
    });
  } catch (error) {

    res.status(500).send("Internal server error");
  }
};

const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const singleUser = await Users.findById(userId);
    res.json({
      success: true,
      message: true,
      user: singleUser,
    });
  } catch (error) {
    res.send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await Users.findByIdAndDelete(userId);
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Invalid",
    });
  }
};

const getPagination = async (req, res) => {
  const page = parseInt(req.query.page);
  const pageSize = 5;

  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const users = await Users.find();

  // Slice the products array based on the indexes
  const paginatedUsers = users.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / pageSize);

  // Send the paginated products and total pages as the API response
  res.json({ users: paginatedUsers, totalPages });
};

const updateUser = async (req, res) => {
  // destructuring data
  const { UserName, email, phoneNumber, address } = req.body;
  const { profilePicture } = req.files;

  // validate data
  if (!UserName || !email || !phoneNumber) {
    return res.json({
      success: false,
      message: "Required fields are missing!",
    });
  }

  try {
    // case 1 : if there is image
    if (profilePicture) {
      // upload image to cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload(
        profilePicture.path,
        {
          folder: "users",
          crop: "scale",
        }
      );

      // make updated json data
      const updatedData = {
        UserName: UserName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        profilePicture: uploadedImage.secure_url,
      };

      // find product and update
      const userId = req.params.id;
      await Users.findByIdAndUpdate(userId, updatedData);
      res.json({
        success: true,
        message: "User updated successfully with Image!",
        updatedUser: updatedData,
      });
    } else {
      // update without image
      const updatedData = {
        UserName: UserName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      };

      // find product and update
      const userId = req.params.id;
      await Users.findByIdAndUpdate(userId, updatedData);
      res.json({
        success: true,
        message: "User updated successfully without Image!",
        updatedUser: updatedData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const checkSession = (req, res) => {
  if (req.session.userId) {
    res.json({ success: true, message: 'Session is active' });
  } else {
    res.json({ success: false, message: 'Session expired' });
  }
};

const logout = (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ success: false, message: 'Failed to log out. Please try again.' });
    }

    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logout successful' });
  });
};

const notifyPasswordExpiry = async () => {
  const users = await Users.find({
    passwordChangedAt: {
      $lt: new Date(Date.now() - (75 * 24 * 60 * 60 * 1000)) // Notify 15 days before expiry
    }
  });

  users.forEach(async (user) => {
    await sendEmail({
      email: user.email,
      subject: "Password Expiry Notice",
      message: "Your password will expire in 15 days. Please update it to maintain account security.",
    });
  });
};

module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUsers,
  getSingleUser,
  deleteUser,
  getPagination,
  updateUser,
  logout,
  checkSession,
  notifyPasswordExpiry,
};
