const Admin = require("../model/admin");

exports.createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      address: req.body.address,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        address: req.body.address,
      },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      success: true,
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid admin ID" });
  }
};
