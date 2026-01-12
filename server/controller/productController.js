const Product = require("../model/product");

exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("mode", "name")
      .populate("category", "name")
      .populate("subCategory", "name");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductsByFilter = async (req, res) => {
  try {
    const { modeId, categoryId, subCategoryId } = req.query;

    const filter = { isActive: true };

    if (modeId) filter.mode = modeId;
    if (categoryId) filter.category = categoryId;
    if (subCategoryId) filter.subCategory = subCategoryId;

    const products = await Product.find(filter)
      .populate("mode", "name")
      .populate("category", "name")
      .populate("subCategory", "name");

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });

    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.toggleStock = async (req, res) => {
  try {
    const { inStock, platesAvailable } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔴 Turning OFF stock
    if (inStock === false) {
      product.inStock = false;
      product.platesAvailable = 0;

      await product.save();

      return res.status(200).json({
        success: true,
        message: "Product marked as OUT OF STOCK",
        data: product,
      });
    }

    // 🟢 Turning ON stock
    if (inStock === true) {
      if (!platesAvailable || platesAvailable <= 0) {
        return res.status(400).json({
          success: false,
          message: "Plates available must be greater than 0 to mark IN STOCK",
        });
      }

      product.inStock = true;
      product.platesAvailable = platesAvailable;

      await product.save();

      return res.status(200).json({
        success: true,
        message: "Product marked as IN STOCK",
        data: product,
      });
    }

    res.status(400).json({
      success: false,
      message: "Invalid stock operation",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({
      category: categoryId,
      isActive: true,
      inStock: true,
    })
      .populate("mode", "name")
      .populate("category", "name")
      .populate("subCategory", "name");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductsBySubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    const products = await Product.find({
      subCategory: subCategoryId,
      isActive: true,
      inStock: true,
    })
      .populate("mode", "name")
      .populate("category", "name")
      .populate("subCategory", "name");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductsByMode = async (req, res) => {
  try {
    const { modeId } = req.params;

    const products = await Product.find({
      mode: modeId,
      isActive: true,
      inStock: true,
    })
      .populate("mode", "name")
      .populate("category", "name")
      .populate("subCategory", "name");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
