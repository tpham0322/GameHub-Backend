const Review = require("../models/Review");
const User = require("../models/User");
const Game = require("../models/Game");

const getReviews = async (req, res) => {
  try {
    const { gameId } = req.params;

    const reviews = await Review.find({
      game: gameId
    })
      .populate("user", "username")
      .populate("game");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getReviews
};