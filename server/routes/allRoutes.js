const express = require("express");
const router = express.Router();
const modeRoutes = require("./modeRoutes");
const categoryRoutes = require("./categoryRoutes");
router.use("/modes", modeRoutes);
router.use("/category", categoryRoutes);
module.exports = router;
