const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const {
  createNewUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/signup").post(createNewUser);

router.route("/id/:id").delete(verifyJWT, deleteUser);

module.exports = router;
