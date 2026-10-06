const express = require("express");

const {
  getReviews,
  createReview,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:gameId/reviews", getReviews);
router.post("/:gameId/reviews", authMiddleware, createReview);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;