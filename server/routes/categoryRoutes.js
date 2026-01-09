const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post("/create-category", categoryController.createCategory);
router.get("/get-all-category", categoryController.getCategories);
router.get("/get-category-by-id/:id", categoryController.getCategoryById);
router.put("/update-category/:id", categoryController.updateCategory);
router.delete("/delete-category/:id", categoryController.deleteCategory);
router.patch("/deactivate/:id", categoryController.deactivateCategory);
router.patch("/activate/:id", categoryController.activateCategory);
router.get("/active", categoryController.getCategoriesByActiveMode);

module.exports = router;
