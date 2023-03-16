const User = require("../models/userModel");
const Review = require("../models/reviewModel");
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

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username })
    .select("-password")
    .populate({
      path: "watchlist.movieId",
    })
    .lean();

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
};

const getUserWatchlist = async (req, res) => {
  const { username } = req.params;
  const PAGE_SIZE = 20;
  const page = parseInt(req.query.page || "0");

  const user = await User.findOne({ username }).select("-password").populate({
    path: "watchlist.movieId",
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const watchlistCount = user.watchlist.length;

  user.watchlist.reverse();

  const watchlist = user.watchlist.slice(
    (page - 1) * PAGE_SIZE,
    (page - 1) * PAGE_SIZE + PAGE_SIZE
  );

  res
    .status(200)
    .json({ totalPages: Math.ceil(watchlistCount / PAGE_SIZE), watchlist });
};

const updatePassword = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  if (!validator.isStrongPassword(newPassword)) {
    return res.status(400).json({
      error:
        "Passwords must contain at least 8 characters in upper and lowercase, with at least 1 number and 1 symbol.",
    });
  }

  const salt = await bcrypt.genSalt(10);

  const password = await bcrypt.hash(newPassword, salt);

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { $set: { password } }
  );

  res.status(200).json(`${updatedUser.username}'s password updated`);
};

const updateUsername = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const { newUsername } = req.body;

  if (!newUsername) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const duplicate = await User.findOne({ newUsername });

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ error: "Duplicate username" });
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { $set: { username: newUsername } }
  );

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

  await Review.deleteMany({ userId: id });

  res.status(200).json(user);
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserByUsername,
  getUserWatchlist,
  updatePassword,
  updateUsername,
  updateWatchlist,
  deleteUser,
};
