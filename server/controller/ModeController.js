const Mode = require("../model/mode");

exports.upsertMode = async (req, res) => {
  console.log("set mode///////////");
  try {
    const { isVeg } = req.body;

    if (typeof isVeg !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isVeg must be true or false",
      });
    }

    let mode = await Mode.findOne();

    if (mode) {
      mode.isVeg = isVeg;
      await mode.save();
    } else {
      mode = await Mode.create({ isVeg });
    }

    res.status(200).json({
      success: true,
      message: "Mode updated successfully",
      data: mode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMode = async (req, res) => {
  try {
    const mode = await Mode.findOne({ isActive: true });

    res.status(200).json({
      success: true,
      data: mode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
