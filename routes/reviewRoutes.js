const express = require("express");

const {
  getReviews,
  createReview
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:gameId/reviews", getReviews);
router.post("/:gameId/reviews", authMiddleware, createReview);

module.exports = router;