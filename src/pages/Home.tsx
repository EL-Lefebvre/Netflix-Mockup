import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppProvider";
import FeatureSlider from "../features/components/Carousel/FeatureSlider";
import MoviePage from "./MoviePage";
import { Box, Typography, Button, CardMedia } from "@mui/material";

const Home = () => {
  const { genres = [], popularMovies = [] } = useAppContext();
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [isMoviePageOpen, setIsMoviePageOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMovieClick = (itemId: string) => {
    setSelectedMovieId(itemId);
    setIsMoviePageOpen(true);
    navigate(`/movie/${itemId}`, { state: { backgroundLocation: location } });
  };

  const handleCloseMoviePage = () => {
    setIsMoviePageOpen(false);
    setSelectedMovieId(null);
    navigate(-1);
  };

  const firstMovie = popularMovies[0];
  console.log(isMoviePageOpen);
  return (
    <div>
      {firstMovie && (
        <Box sx={{ position: "relative", width: "100%", height: "500px" }}>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`}
            alt={firstMovie.title}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: 20,
              color: "white",
            }}
          >
            <Typography variant="h2">{firstMovie.title}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleMovieClick(firstMovie.id)}
            >
              Watch Now
            </Button>
          </Box>
        </Box>
      )}

      <div className="Layout">
        <FeatureSlider
          items={popularMovies}
          genres={genres}
          onItemClick={handleMovieClick}
          contentType="movie"
        />
      </div>

      {isMoviePageOpen && selectedMovieId && (
        <MoviePage
          open={isMoviePageOpen}
          handleClose={handleCloseMoviePage}
          type="movie"
          id={selectedMovieId}
          isModal
        />
      )}
    </div>
  );
};

export default Home;
