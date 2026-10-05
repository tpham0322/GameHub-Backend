const express = require("express");

const {
  searchGames,
  getGameById
} = require("../controllers/gameController");

const router = express.Router();

router.get("/", searchGames);
router.get("/:id", getGameById);

module.exports = router;