const User = require("../models/userModel");
const { sendEmailReset } = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "User email doesn't exist" });

    const accessToken = jwt.sign(
      {
        userInfo: {
          username: user.username,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // const url = `http://localhost:3000/reset-password/${accessToken}`;
    const url = `https://kinopicks.onrender.com/reset-password/${accessToken}`;
    const username = user.username;
    sendEmailReset(email, url, username);

    res
      .status(200)
      .json({ msg: "Re-send the password, please check your email." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Passwords must contain at least 8 characters in upper and lowercase, with at least 1 number and 1 symbol.",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.id },
      { $set: { password: hashPassword } }
    );

    res.status(200).json(`${updatedUser.username}'s password updated`);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
