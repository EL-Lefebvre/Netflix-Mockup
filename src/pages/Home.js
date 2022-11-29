import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../features/components/MovieCard"

const Home = () => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=1ae518329a5a523e1a0833feccb74a9d&language=en-US"
      )
      .then((response) => {
        let genreList = response.data.results;
        setMoviesList(genreList);
      });
  }, []);

  console.log(moviesList);
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {moviesList &&
          moviesList.map((movies) => (
            <MovieCard name={movies.original_title} key={movies.id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
