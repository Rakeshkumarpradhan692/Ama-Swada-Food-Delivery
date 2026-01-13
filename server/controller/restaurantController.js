const Restaurant = require("../model/restaurant");

/* ============ CREATE ============ */
exports.createRestaurant = async (req, res) => {
  try {
    const { name, email, phone, address, pin, isOpen } = req.body;

    const exists = await Restaurant.findOne({ phone });
    if (exists) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    const restaurant = await Restaurant.create({
      name,
      email,
      phone,
      address,
      pin,
      isOpen,
    });

    res.status(201).json({ message: "Restaurant created", restaurant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============ GET ALL ============ */
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============ GET BY ID ============ */
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============ UPDATE ============ */
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({ message: "Restaurant updated", restaurant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============ DELETE ============ */
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
