const Collection = require("../models/Collection");

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

module.exports = {
  getCollection
};