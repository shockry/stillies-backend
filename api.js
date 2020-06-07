const express = require("express");
const imdb = require("imdb-api");
const movieTrailer = require("movie-trailer");

const app = express();

app.get("/search/:name", async (req, res) => {
  try {
    const movieDetails = await imdb.get(
      { name: req.params.name },
      { apiKey: process.env.IMDB_API_KEY }
    );
    const trailer = await movieTrailer(req.params.name);

    const { title, genres, plot, year, poster } = movieDetails;

    const response = { title, genres, plot, year, poster, trailer };

    res.json(response);
  } catch (error) {
    console.log(error) || res.status(500).end();
  }
});

module.exports = { app };
