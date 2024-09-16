import { Grid, Typography } from "@mui/material";
import { useAppContext } from "../AppProvider";
import FeatureCard from "../features/components/FeatureCard/FeatureCard";
import { useState } from "react";
import MoviePage from "./MoviePage";

const SearchResults = () => {
  const { searchResults } = useAppContext();
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isMoviePageOpen, setIsMoviePageOpen] = useState(false);

  const handleMovieClick = (itemId) => {
    setSelectedMovieId(itemId);
    setIsMoviePageOpen(true);
  };

  const handleCloseMoviePage = () => {
    setIsMoviePageOpen(false);
    setSelectedMovieId(null);
  };

  const imageUrl = "https://image.tmdb.org/t/p/w500";
  if (searchResults.length === 0) {
    return <Typography variant="h6">No results found</Typography>;
  }

  return (
    <div>
      <div className="Layout" style={{ paddingTop: "100px" }}>
        <Grid container spacing={3}>
          {searchResults.map(
            (movie) =>
              movie.backdrop_path && (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <FeatureCard
                    itemId={movie.id}
                    name={movie.original_title || movie.name}
                    media={`${imageUrl}${movie.backdrop_path}`}
                    onClick={handleMovieClick}
                  />
                </Grid>
              )
          )}
        </Grid>
      </div>
      {isMoviePageOpen && selectedMovieId && (
        <MoviePage
          open={isMoviePageOpen}
          handleClose={handleCloseMoviePage}
          id={selectedMovieId}
          type="movie"
          isModal
        />
      )}
    </div>
  );
};

export default SearchResults;
