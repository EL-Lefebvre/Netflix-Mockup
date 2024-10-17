import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppProvider";
import FeatureSlider from "../features/components/Carousel/FeatureSlider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import DetailsPage from "./DetailsPage";

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

  return (
    <div>
      {firstMovie && (
        <Box sx={{ position: "relative", width: "100%", height: "600px" }}>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`}
            alt={firstMovie.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onClick={() => handleMovieClick(firstMovie.id)}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: "20px",
              }}
            >
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                style={{
                  textTransform: "none",
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={() => handleMovieClick(firstMovie.id)}
              >
                <Typography>Play</Typography>
              </Button>
              <Button
                startIcon={<InfoIcon />}
                variant="contained"
                onClick={() => handleMovieClick(firstMovie.id)}
                sx={{
                  backgroundColor: "rgba(128, 128, 128, 0.5)",
                  color: "white",
                  textTransform: "none",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(128, 128, 128, 0.2)",
                  },
                }}
              >
                <Typography>More Info</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      <div className="LayoutHome">
        <FeatureSlider
          items={popularMovies}
          genres={genres}
          onItemClick={handleMovieClick}
          contentType="movie"
        />
      </div>

      {isMoviePageOpen && selectedMovieId && (
        <DetailsPage
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
