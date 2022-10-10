const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const {
  createNewUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.use(verifyJWT);

router.route("/").get(getAllUsers);

router.route("/signup").post(createNewUser);

router.route("/id/:id").delete(deleteUser);

module.exports = router;
