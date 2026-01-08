const express = require("express");
const router = express.Router();

const { upsertMode, getMode } = require("../controller/ModeController");

router.get("/get-mode", getMode);
router.post("/set-mode", upsertMode);

module.exports = router;
