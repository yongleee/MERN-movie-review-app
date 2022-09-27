const User = require("../models/userModel");

const logInUser = async (req, res) => {
  res.json({ mssg: "log in user" });
};

module.exports = { logInUser };
