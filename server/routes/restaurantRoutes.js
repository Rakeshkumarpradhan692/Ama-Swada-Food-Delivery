const express = require("express");
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require("../controller/restaurantController");

const router = express.Router();

router.post("/create", createRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.put("/update/:id", updateRestaurant);
router.delete("/delete/:id", deleteRestaurant);

module.exports = router;
