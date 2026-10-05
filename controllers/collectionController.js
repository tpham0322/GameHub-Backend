const Collection = require("../models/Collection");
const Game = require("../models/Game");

const getCollection = async (req, res) => {
  try {
    const collection = await Collection.find({
      user: req.user.id
    }).populate("game");

    res.json(collection);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const addToCollection = async (req, res) => {
  try {
    const { game, status } = req.body;

    if (!game) {
      return res.status(400).json({
        message: "Game is required"
      });
    }

    const existingGame = await Collection.findOne({
      user: req.user.id,
      game
    });

    if (existingGame) {
      return res.status(400).json({
        message: "Game is already in your collection"
      });
    }

    const collectionItem = await Collection.create({
      user: req.user.id,
      game,
      status
    });

    const populatedItem = await collectionItem.populate("game");

    res.status(201).json(populatedItem);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getCollection,
  addToCollection
};