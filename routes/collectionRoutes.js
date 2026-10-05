const express = require("express");

const {
  getCollection,
  addToCollection,
  updateCollection
} = require("../controllers/collectionController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getCollection);
router.post("/", authMiddleware, addToCollection);
router.put("/:id", authMiddleware, updateCollection);

module.exports = router;