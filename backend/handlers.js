require("dotenv").config();

const apiKey = process.env.API_KEY;
const api_url = "https://api.themoviedb.org/3/";
const { MongoClient } = require("mongodb");

const fetch = require("isomorphic-fetch");
const options = {
  method: "GET",
  headers: {
    apiKey: `${apiKey}`,
    "Content-Type": "application/json",
  },
};


const getPopularMovies = async (req, res) => {
  const response = axios
    .get(`${api_url}/movie/popular?api_key=${apiKey}&language=en-US`)
    .then((response) => {
      let genreList = response.data.genres;
      setMoviesList(genreList);
    });
  const data = await response.json();

  res.status(200).json({ status: 200, data });
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
//Get similar recipes as a particular one

//Wine pairing with recipe

//Post your own recipe

// const newPost = async (req, res) => {
//   await addingRecipe(req, res);
// };
// const getUserFavorites = async (req, res) => {
//   await getFavorites(req, res);
// };
// const newFavorite = async (req, res) => {
//   await addFavorite(req, res);
// };
// const newFavoriteUpdate = async (req, res) => {
//   await updateFavorite(req, res);
// };
// const getPosts = async (req, res) => {
//   await getPostedRecipes(req, res);
// };
// const infoBulk = async (req, res) => {
//   const ids = req.params.ids;
//   const api_url = "https://api.spoonacular.com/recipes";
//   const response = await fetch(
//     `${api_url}/informationBulk?apiKey=${apiKey}&ids=${ids}`,
//     options
//   );
//   const data = await response.json();
//   console.log(data);
//   res.status(200).json({ status: 200, data });
// };
module.exports = {
  getGenreList,
  getMoviesList,
  getPopularMovies,

};
