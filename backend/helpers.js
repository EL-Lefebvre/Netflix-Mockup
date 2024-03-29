require("dotenv").config();
const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const apiKey = process.env.API_KEY;
const api_url = "https://api.themoviedb.org/3/";
const fetch = require("isomorphic-fetch");

const getOptions = {
  method: "GET",
  headers: {
    apiKey: `${apiKey}`,
    "Content-Type": "application/json",
  },
};

const addingRecipe = async (req, res) => {
  const { username, title, details, ingredients, fileUpload } = req.body;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = await client.db("recipes");
  const data = await db.collection("postedRecipes").insertOne({
    username: username,
    title: title,
    ingredients: ingredients,
    details: details,
    fileUpload: fileUpload,
  });

  client.close();
  res.status(201).json({ status: 201, data: data });
};

const getPostedRecipes = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");
  const db = await client.db("recipes");

  const data = await db.collection("postedRecipes").find().toArray();

  client.close();
  res.status(200).json({ status: 200, data: data });
};

const getGenres = async (req, res) => {
  const user = req.params.user;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");
  const db = await client.db("recipes");

  const userData = await db
    .collection("authentification")
    .findOne({ username: user });

  const dataArray = await userData.recipeList;
  const response = await fetch(
    `${api_url}/informationBulk?apiKey=${apiKey}&ids=${dataArray}`,
    getOptions
  );
  const data = await response.json();

  client.close();
  res.status(200).json({ status: 200, data: data });
};
const getMoviesList = async (req, res) => {
  const { username, recipeId } = req.body;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = await client.db("recipes");

  const data = await db.collection("authentification").updateOne(
    {
      username: username,
    },

    { $addToSet: { recipeList: recipeId } },
    {upsert: true}
    
  );

  client.close();
  res.status(201).json({ status: 201, data: data });
};

const updateFavorite = async (req, res) => {
  const { username, recipeId } = req.body;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = await client.db("recipes");

  const data = await db.collection("authentification").updateOne(
    {
      username: username,
    },

    { $pull: { recipeList: recipeId } }
  );
  client.close();
  res.status(201).json({ status: 201, data: data });
};
module.exports = {
  addingRecipe,
  getPostedRecipes,
  getFavorites,
  addFavorite,
  updateFavorite,
};
