const express = require("express");

const {
  getCollection
} = require("../controllers/collectionController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getCollection);

module.exports = router;