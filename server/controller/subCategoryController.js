const SubCategory = require("../model/SubCategory");
const Mode = require("../model/mode");

exports.createSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.create(req.body);
    res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      data: subCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .populate("category")
      .populate("mode");

    res.status(200).json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subCategories = await SubCategory.find({
      category: categoryId,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "SubCategory updated successfully",
      data: updatedSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deactivateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "SubCategory deactivated",
      data: subCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getActiveSubCategories = async (req, res) => {
  try {
    const activeMode = await Mode.findOne({ isActive: true });

    if (!activeMode) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const subCategories = await SubCategory.find({
      mode: activeMode._id,
      isActive: true,
    }).populate("category");

    res.status(200).json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
