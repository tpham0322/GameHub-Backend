const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    rawgId: {
      type: Number,
      required: true,
      unique: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    },

    genres: {
      type: [String],
      default: []
    },

    platforms: {
      type: [String],
      default: []
    },

    releaseDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Game", gameSchema);