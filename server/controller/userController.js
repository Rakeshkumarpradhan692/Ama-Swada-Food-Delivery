const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, number, address, pin } = req.body;

    const exists = await User.findOne({ number });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      number,
      address,
      pin,
    });

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { number } = req.body;

    const user = await User.findOne({ number });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token required" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token required" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByIdAndUpdate(decoded.userId, req.body, {
      new: true,
    });

    res.json({
      message: "User updated",
      user,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token required" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await User.findByIdAndDelete(decoded.userId);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
