const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    watchlist: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
