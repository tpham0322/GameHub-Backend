const express = require("express");

const {
  getCollection,
  addToCollection,
  updateCollection,
  deleteFromCollection
} = require("../controllers/collectionController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getCollection);
router.post("/", authMiddleware, addToCollection);
router.put("/:id", authMiddleware, updateCollection);
router.delete("/:id", authMiddleware, deleteFromCollection);

module.exports = router;