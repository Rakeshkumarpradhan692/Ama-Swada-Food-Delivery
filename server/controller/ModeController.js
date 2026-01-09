const Mode = require("../model/mode");

exports.createModes = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !["veg", "non-veg"].includes(name)) {
      return res.status(400).json({
        success: false,
        message: "Mode must be 'veg' or 'non-veg'",
      });
    }

    const exists = await Mode.findOne({ name });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Mode already exists",
      });
    }

    const mode = await Mode.create({ name });

    res.status(201).json({
      success: true,
      message: "Mode created successfully",
      data: mode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllModes = async (req, res) => {
  try {
    const modes = await Mode.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: modes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getActiveMode = async (req, res) => {
  try {
    const activeMode = await Mode.findOne({ isActive: true });

    if (!activeMode) {
      return res.status(404).json({
        success: false,
        message: "No active mode found",
      });
    }

    res.status(200).json({
      success: true,
      data: activeMode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.setActiveMode = async (req, res) => {
  try {
    const { id } = req.params;

    await Mode.updateMany({}, { isActive: false });

    const activeMode = await Mode.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    if (!activeMode) {
      return res.status(404).json({
        success: false,
        message: "Mode not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mode activated successfully",
      data: activeMode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
