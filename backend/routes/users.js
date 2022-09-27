const express = require("express");

const {
  signUpUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/signup").post(signUpUser);

router.route("/id/:id").delete(deleteUser);

module.exports = router;
