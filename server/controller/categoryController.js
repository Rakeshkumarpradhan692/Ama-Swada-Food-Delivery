const Category = require("../model/category");
const Mode = require("../model/mode");

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "mode",
      "name isActive"
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, image, description, mode } = req.body;

    const modeExists = await Mode.findById(mode);
    if (!modeExists) {
      return res.status(404).json({
        success: false,
        message: "Mode not found",
      });
    }

    const category = await Category.create({
      name,
      image,
      description,
      mode,
      isActive: true,
    });

    const populatedCategory = await Category.findById(category._id).populate(
      "mode",
      "name isActive"
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: populatedCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const activeMode = await Mode.findOne({ isActive: true });

    let filter = { isActive: true };

    // If active mode is veg → show only veg categories
    if (activeMode && activeMode.name === "veg") {
      filter.mode = activeMode._id;
    }

    const categories = await Category.find(filter)
      .populate("mode", "name")
      .select("-__v");

    res.status(200).json({
      success: true,
      currentMode: activeMode?.name || "all",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, image, description, mode } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (mode) {
      const modeExists = await Mode.findById(mode);
      if (!modeExists) {
        return res.status(404).json({
          success: false,
          message: "Mode not found",
        });
      }
      category.mode = mode;
    }

    if (name) category.name = name;
    if (image) category.image = image;
    if (description) category.description = description;

    await category.save();

    const populatedCategory = await Category.findById(category._id).populate(
      "mode",
      "name isActive"
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: populatedCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("mode", "name isActive")
      .select("-__v");

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoriesByActiveMode = async (req, res) => {
  try {
    // 1️⃣ Get the currently active mode
    const activeMode = await Mode.findOne({ isActive: true });

    if (!activeMode) {
      return res.status(404).json({
        success: false,
        message: "No active mode found",
      });
    }

    // 2️⃣ Filter categories based on the active mode
    let categories;

    // If active mode is 'veg', show only veg categories
    if (activeMode.name === "veg") {
      categories = await Category.find({ mode: activeMode._id, isActive: true })
        .populate("mode", "name")
        .select("-__v");
    } else {
      // If active mode is 'non-veg', show all categories
      categories = await Category.find({ isActive: true })
        .populate("mode", "name")
        .select("-__v");
    }

    res.status(200).json({
      success: true,
      currentMode: activeMode.name,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.deleteOne();
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.deactivateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.isActive = false;
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category deactivated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.activateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.isActive = true;
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category activated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
