const express = require("express");
const router = express.Router();

const {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  updateSubCategory,
  deactivateSubCategory,
  getActiveSubCategories,
} = require("../controller/subCategoryController");

router.post("/create-subCategory", createSubCategory);
router.get("/get-all-subCategory", getAllSubCategories);
router.get(
  "/get-subCategory-by-category/:categoryId",
  getSubCategoriesByCategory
);
router.put("/update-subCategory/:id", updateSubCategory);
router.patch("/deactivate-subCategory/:id", deactivateSubCategory);
router.get("/active", getActiveSubCategories);

module.exports = router;
