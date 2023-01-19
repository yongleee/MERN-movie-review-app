require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const reviewRoutes = require("./routes/reviews");
const movieRoutes = require("./routes/movies");
const authRoutes = require("./routes/auths");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());

// A middleware that looks for data passing through request to the server and attaches it to the request object (req.body)
app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/reviews", reviewRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/auths", authRoutes);
app.use("/api/users", userRoutes);

// Connects to the database, async function
// Only listens to the request once it is connected to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to the database");
    app.listen(process.env.PORT, () => {
      console.log("listening to port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
