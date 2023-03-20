require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const reviewRoutes = require("./routes/reviews");
const movieRoutes = require("./routes/movies");
const authRoutes = require("./routes/auths");
const userRoutes = require("./routes/users");

const port = process.env.PORT || 5000;

const app = express();

app.use(credentials);

app.use(cors(corsOptions));

// A middleware that looks for data passing through request to the server and attaches it to the request object (req.body)
app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

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
    app.listen(port, () => {
      console.log("listening to port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
