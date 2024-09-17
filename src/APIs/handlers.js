require("dotenv").config();

const apiKey = process.env.API_KEY;
const api_url = "https://api.themoviedb.org/3";
const { MongoClient } = require("mongodb");

const fetch = require("isomorphic-fetch");
const options = {
  method: "GET",
  headers: {
    apiKey: `${apiKey}`,
    "Content-Type": "application/json",
  },
};

const axios = require("axios");

const getPopularMovies = async (req, res) => {
  try {
    // Fetch data from the API
    const response = await axios.get(
      `${api_url}/movie/popular?api_key=1ae518329a5a523e1a0833feccb74a9d&language=en-US`
    );
    const genreList = response.data; // Adjust according to your API response structure

    // Send the data back to the client
    res.status(200).json({ status: 200, data: genreList });
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

const getGenreList = async (req, res) => {
  const response = axios
    .get(`${api_url}/genre/list?api_key=${apiKey}&language=en-US`)
    .then((response) => {
      let genreList = response.data.genres;
      setMoviesList(genreList);
    });
  const data = await response.json();

  res.status(200).json({ status: 200, data });
};

// Get movies by genre
const getMoviesList = async (req, res) => {
  const response = await fetch(
    `${api_url}/random?apiKey=${apiKey}&number=10&tags=dinner`,
    options
  );
  const data = await response.json();

  res.status(200).json({ status: 200, data });
};

//Get popular movies
// const getPopularMovies = async (req, res) => {
//   const id = req.params.id;

//   const response = await fetch(
//     `${api_url}/${id}/information?apiKey=${apiKey}&includeNutrition=true`,
//     options
//   );
//   const data = await response.json();

//   res.status(200).json({ status: 200, data });
// };

//Search recipe by ingredients
const searchRecipe = async (req, res) => {
  const food = req.params.food;
  console.log(food);
  const response = await fetch(
    `${api_url}/complexSearch/?apiKey=${apiKey}&query=${food}`,
    options
  );
  const data = await response.json();
  console.log(data);
  res.status(200).json({ status: 200, data });
};

const filterRecipe = async (req, res) => {
  const keyword = req.query.keyword;
  const cuisine = req.query.cuisine;
  const type = req.query.type;
  const diet = req.query.diet;
  const intolerances = req.query.intolerances;

  const response = await fetch(
    `${api_url}/complexSearch/?apiKey=${apiKey}&query=${keyword}&number=20&cuisine=${cuisine}&type=${type}&diet=${diet}&intolerances=${intolerances}`,
    options
  );
  const data = await response.json();

  res.status(200).json({ status: 200, data });
};

module.exports = {
  getGenreList,
  getMoviesList,
  getPopularMovies,
};
