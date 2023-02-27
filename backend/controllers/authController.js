const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const logInUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.login(emailOrUsername, password);

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

    const refreshToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.status(200).json({
      username: user.username,
      email: user.email,
      watchlist: user.watchlist,
      userId: user._id,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(401).json({ message: "No token, unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Forbidden for refresh" });

      const user = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!user)
        return res.status(401).json({ message: "No user, unauthorized" });

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

      console.log(user._id);

      res.json({
        username: user.username,
        email: user.email,
        watchlist: user.watchlist,
        userId: user._id,
        accessToken,
      });
    }
  );
};

const logOutUser = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = { logInUser, refresh, logOutUser };
