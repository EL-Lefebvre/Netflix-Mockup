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

export { fetchGenres };
