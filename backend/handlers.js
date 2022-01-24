require("dotenv").config();

const apiKey = process.env.API_KEY;
const api_url = "https://api.themoviedb.org/3/";
const apiKey = process.env.API_KEY;

const getGenreList = async (req, res) => {
  const response = axios
    .get(`${api_url}/genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then((response) => {
      let genreList = response.data.genres;
      setMoviesList(genreList);
    });
  const data = await response.json();

  res.status(200).json({ status: 200, data });
};

const getGenre = async (req, res) => {
  await getGenreList(req, res);
};

module.exports = { getGenre };
