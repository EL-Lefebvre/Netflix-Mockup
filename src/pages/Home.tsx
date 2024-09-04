import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import MovieCard from "../features/components/MovieCard";
import { Grid, Typography } from "@mui/material";
import SearchBarContainer from "../features/components/SearchBar/SearchBarContainer";
import "./Home.css";
import MovieLists from "../features/components/MovieLists";
import { AppContext } from "../AppContext";

const Home = () => {
  const { data, loading, error } = useContext(AppContext);
  const [moviesList, setMoviesList] = useState([]);
  const imageUrl = "https://image.tmdb.org/t/p/w500";
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
  console.log(data);
  return (
    <div>
      <div className="TopPadding">
        <h1>Home Page</h1>
      </div>
      <div className="Layout">
        <Grid container spacing={2}>
          {moviesList &&
            moviesList.map((movie) => (
              <Grid item xs={4}>
                <MovieCard
                  name={movie.original_title}
                  media={`${imageUrl}${movie.backdrop_path}`}
                  key={movie.id}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
