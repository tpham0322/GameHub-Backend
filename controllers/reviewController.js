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

const createReview = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({
        message: "Rating is required"
      });
    }

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        message: "Game not found"
      });
    }

    const review = await Review.create({
      user: req.user.id,
      game: gameId,
      rating,
      comment
    });

    await review.populate([
      {
        path: "user",
        select: "username"
      },
      {
        path: "game"
      }
    ]);

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getReviews,
  createReview
};