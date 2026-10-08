const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true
    },
    status: {
      type: String,
      enum: ["Want to Play", "Playing", "Completed"],
      default: "Want to Play"
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

collectionSchema.index(
  { user: 1, game: 1 },
  { unique: true }
);

module.exports = mongoose.model("Collection", collectionSchema);