const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createNewUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    await User.signup(email, password, username);

    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({})
    .sort({ createdAt: -1 })
    .select("-password")
    .populate({
      path: "watchlist.movieId",
    })
    .lean();

  res.status(200).json(users);
};

const updatePassword = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  if (!validator.isStrongPassword(newPassword)) {
    return res.status(400).json({
      message:
        "Passwords must contain at least 8 characters in upper and lowercase, with at least 1 number and 1 symbol.",
    });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  const updatedUser = await user.save();

  res.status(200).json(`${updatedUser.username}'s password updated`);
};

const updateUsername = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const { newUsername } = req.body;

  if (!newUsername) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const duplicate = await User.findOne({ newUsername });

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = newUsername;

  const updatedUser = await user.save();

  res.status(200).json(`Username updated to ${updatedUser.username}`);
};

const updateWatchlist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user id" });
  }

  const { movieId } = req.body;

  const user = await User.findOneAndUpdate({ _id: id }, [
    {
      $set: {
        watchlist: {
          $cond: [
            { $in: [{ movieId }, "$watchlist"] },
            {
              $filter: {
                input: "$watchlist",
                cond: { $ne: ["$$this.movieId", movieId] },
              },
            },
            { $concatArrays: ["$watchlist", [{ movieId }]] },
          ],
        },
      },
    },
  ]);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(`${user.username}'s watchlist has updated`);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

module.exports = {
  createNewUser,
  deleteUser,
  getAllUsers,
  updatePassword,
  updateUsername,
  updateWatchlist,
};
