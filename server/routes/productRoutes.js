const express = require("express");
const router = express.Router();

const {
  addProduct,
  getAllProducts,
  getProductsByFilter,
  updateProduct,
  deleteProduct,
  toggleStock,
  getProductsByCategory,
  getProductsBySubCategory,
  getProductsByMode,
} = require("../controller/productController");

router.post("/", addProduct);
router.get("/", getAllProducts);
router.get("/filter", getProductsByFilter);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/stock/:id", toggleStock);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/sub-category/:subCategoryId", getProductsBySubCategory);
router.get("/mode/:modeId", getProductsByMode);

module.exports = router;
