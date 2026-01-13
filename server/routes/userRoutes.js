const express = require("express");
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/userController");

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);

router.get("/:id", getUserById);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

module.exports = router;
