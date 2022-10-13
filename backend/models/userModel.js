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
      unique: true,
      maxLength: 36,
    },
    watchlist: [
      {
        movieId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Movie",
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password, username) {
  if (!email || !password || !username) {
    throw Error("All fields must be filled.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Passwords must contain at least 8 characters in upper and lowercase, with at least 1 number and 1 symbol."
    );
  }

  if (username.length > 36) {
    throw Error("The maximum length of an username is 36 characters.");
  }

  const existedEmail = await this.findOne({ email });
  if (existedEmail) {
    throw Error("Email already in use.");
  }

  const existedUsername = await this.findOne({ username });
  if (existedUsername) {
    throw Error("Username already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, username });

  return user;
};

userSchema.statics.login = async function (emailOrUsername, password) {
  if (!emailOrUsername || !password) {
    throw Error("All fields must be filled");
  }

  let user;
  if (validator.isEmail(emailOrUsername)) {
    user = await this.findOne({ email: emailOrUsername });
    if (!user) {
      throw Error("Incorrect email");
    }
  } else if (!validator.isEmail(emailOrUsername)) {
    user = await this.findOne({ username: emailOrUsername });
    if (!user) {
      throw Error("Incorrect username");
    }
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
