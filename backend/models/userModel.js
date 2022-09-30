const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    watchlist: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Movie",
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (email, password, username) {
  if (!email || !password || !username) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Passwords must contain at least 8 characters in upper and lowercase, with at least 1 number and 1 symbol."
    );
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, username });

  return user;
};

module.exports = mongoose.model("User", userSchema);
