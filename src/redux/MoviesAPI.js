import axios from "axios";

export const fetchMovies = async () => {
  const data = await axios
    .get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=1ae518329a5a523e1a0833feccb74a9d&language=en-US"
    )
    .then((response) => {
      const data = response.data.genres;
    });
  return data;
};
