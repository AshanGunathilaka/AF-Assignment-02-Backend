const express = require("express");
const {
  addFavorite,
  getFavorites,
  removeFavorite,
  checkFavorite,
} = require("../controllers/favoriteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getFavorites).post(protect, addFavorite);

router
  .route("/:countryCode")
  .get(protect, checkFavorite)
  .delete(protect, removeFavorite);

module.exports = router;
