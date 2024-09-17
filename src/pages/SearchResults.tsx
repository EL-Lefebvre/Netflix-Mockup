import { Grid, Typography } from "@mui/material";
import { useAppContext } from "../AppProvider";
import FeatureCard from "../features/components/FeatureCard/FeatureCard";
import { useState } from "react";
import MoviePage from "./MoviePage";
import "./SearchResults.css";

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
      <div className="Layout" style={{ maxWidth: "100%" }}>
        <Grid container spacing={{ xs: 0, sm: 2 }} justifyContent="center">
          {searchResults.map(
            (movie) =>
              movie.backdrop_path && (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{ paddingBottom: 2 }}
                  key={movie.id}
                >
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
