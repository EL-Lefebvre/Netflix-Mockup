import React from "react";
import MovieCard from "./MovieCard";
const MovieLists = (list: any) => {
  interface popularMovieType {
    name: string;
    media: string;
    key: any;
  }
  return (
    <div>
      {/* {list &&
        list.map((movie) => (
          <MovieCard
            name={movie.original_title}
            media={movie.backdrop_path}
            key={movie.id}
          />
        ))} */}
    </div>
  );
};

export default MovieLists;
