const express = require("express");
const router = express.Router();

const {
  createModes,
  getAllModes,
  getActiveMode,
  setActiveMode,
} = require("../controller/ModeController");

router.post("/create-mode", createModes);
router.get("/get-all-mode", getAllModes);
router.get("/get-active-mode", getActiveMode);
router.patch("/activate-mode/:id", setActiveMode);

module.exports = router;
