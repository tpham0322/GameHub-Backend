const express = require("express");

const {
  getCollection,
  addToCollection
} = require("../controllers/collectionController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getCollection);
router.post("/", authMiddleware, addToCollection);

module.exports = router;