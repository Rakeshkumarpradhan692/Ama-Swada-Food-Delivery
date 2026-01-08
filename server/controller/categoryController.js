const Category = require("../model/category");
const Mode = require("../model/mode");

exports.createCategory = async (req, res) => {
  try {
    const { name, image, description, mode } = req.body;
    const modeExists = await Mode.findById(mode);
    if (!modeExists) return res.status(404).json({ message: "Mode not found" });

    const category = new Category({ name, image, description, mode });
    await category.save();

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).populate(
      "mode",
      "isVeg"
    );
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "mode",
      "isVeg"
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, image, description, mode, isActive } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (mode) {
      const modeExists = await Mode.findById(mode);
      if (!modeExists)
        return res.status(404).json({ message: "Mode not found" });
      category.mode = mode;
    }

    category.name = name || category.name;
    category.image = image || category.image;
    category.description = description || category.description;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();
    res.status(200).json({ success: true, data: category });
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

    res
      .status(200)
      .json({
        success: true,
        message: "Category activated successfully",
        data: category,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
