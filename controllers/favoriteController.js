const asyncHandler = require("../utils/asyncHandler");
const Favorite = require("../models/favoriteModel");

// @desc    Add a country to favorites
// @route   POST /api/favorites
// @access  Private
const addFavorite = asyncHandler(async (req, res) => {
  const { countryCode, countryName, flagUrl } = req.body;

  // Check if already in favorites
  const existingFavorite = await Favorite.findOne({
    user: req.user._id,
    countryCode,
  });

  if (existingFavorite) {
    res.status(400);
    throw new Error("Country already in favorites");
  }

  const favorite = await Favorite.create({
    user: req.user._id,
    countryCode,
    countryName,
    flagUrl,
  });

  res.status(201).json(favorite);
});

// @desc    Get user's favorite countries
// @route   GET /api/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id });
  res.json(favorites);
});

// @desc    Remove a country from favorites
// @route   DELETE /api/favorites/:countryCode
// @access  Private
const removeFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOne({
    user: req.user._id,
    countryCode: req.params.countryCode,
  });

  if (!favorite) {
    res.status(404);
    throw new Error("Favorite not found");
  }

  await favorite.deleteOne();
  res.json({ message: "Favorite removed" });
});

// @desc    Check if a country is in user's favorites
// @route   GET /api/favorites/:countryCode
// @access  Private
const checkFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOne({
    user: req.user._id,
    countryCode: req.params.countryCode,
  });

  res.json({ isFavorite: !!favorite });
});

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
  checkFavorite,
};
