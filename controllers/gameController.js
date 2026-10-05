const axios = require("axios");

const searchGames = async (req, res) => {
  try {
    const { search } = req.query;

    const response = await axios.get(
      "https://api.rawg.io/api/games",
      {
        params: {
          key: process.env.RAWG_API_KEY,
          search
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("RAWG API error:", error.message);

    res.status(500).json({
      message: "Failed to fetch games from RAWG"
    });
  }
};

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}`,
      {
        params: {
          key: process.env.RAWG_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("RAWG API error:", error.message);

    res.status(500).json({
      message: "Failed to fetch game details"
    });
  }
};

module.exports = {
  searchGames,
  getGameById
};