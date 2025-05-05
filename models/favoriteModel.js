const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    countryCode: {
      type: String,
      required: true,
    },
    countryName: {
      type: String,
      required: true,
    },
    flagUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can't favorite the same country twice
favoriteSchema.index({ user: 1, countryCode: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
