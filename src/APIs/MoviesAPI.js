import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;
const api_url = "https://api.themoviedb.org/3";

const fetchGenres = async () => {
  const data = await axios
    .get(`${api_url}/genre/list?api_key=${apiKey}&language=en-US`)
    .then((response) => {
      const res = response.data;

      return res;
    });
  return data;
};

const fetchPopularMovies = async (pages = [1]) => {
  try {
    const requests = pages.map((page) =>
      axios.get(
        `${api_url}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      )
    );

    const responses = await Promise.all(requests);

    const uniqueMovieIds = new Set();
    const allMovies = [];

    responses.forEach((response) => {
      response.data.results.forEach((movie) => {
        if (!uniqueMovieIds.has(movie.id)) {
          uniqueMovieIds.add(movie.id);
          allMovies.push(movie);
        }
      });
    });

    return allMovies;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

const fetchPopularTVShows = async (pages = [1]) => {
  try {
    const requests = pages.map((page) =>
      axios.get(
        `${api_url}/trending/tv/day?api_key=${apiKey}&language=en-US&page=${page}`
      )
    );

    const responses = await Promise.all(requests);

    // Use a Set to track unique movie IDs
    const uniqueMovieIds = new Set();
    const allMovies = [];

    responses.forEach((response) => {
      response.data.results.forEach((movie) => {
        if (!uniqueMovieIds.has(movie.id)) {
          uniqueMovieIds.add(movie.id);
          allMovies.push(movie);
        }
      });
    });

    return allMovies;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};
const fetchSearch = async (keyword, pages = [1]) => {
  if (!keyword) {
    console.error("Keyword is required for search.");
    return [];
  }

  try {
    const requests = pages.map((page) =>
      axios.get(
        `${api_url}/search/keyword?api_key=${apiKey}&query=${encodeURIComponent(
          keyword
        )}&language=en-US&page=${page}`
      )
    );

    const responses = await Promise.all(requests);

    const uniqueMovieIds = new Set();
    const allMovies = [];

    responses.forEach((response) => {
      response.data.results.forEach((movie) => {
        if (!uniqueMovieIds.has(movie.id)) {
          uniqueMovieIds.add(movie.id);
          allMovies.push(movie);
        }
      });
    });

    return allMovies;
  } catch (error) {
    console.error("Error fetching movies by keyword:", error);
    return [];
  }
};

export { fetchGenres, fetchSearch, fetchPopularMovies, fetchPopularTVShows };
