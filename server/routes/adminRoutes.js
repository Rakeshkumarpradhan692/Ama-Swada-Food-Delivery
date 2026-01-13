const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.post("/create-admin", adminController.createAdmin);
router.put("/update-admin/:id", adminController.updateAdmin);
router.delete("/delete-admin/:id", adminController.deleteAdmin);
router.get("/get-all-admin", adminController.getAllAdmins);
router.get("/admin-get-by-id/:id", adminController.getAdminById);

module.exports = router;
