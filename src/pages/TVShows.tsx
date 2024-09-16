import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FeatureSlider from "../features/components/Carousel/FeatureSlider";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import { useAppContext } from "../AppProvider";
import MoviePage from "./MoviePage";
import ContentPage from "./ContentPage";

const TVShows = () => {
  const { genres = [], popularTVShows = [] } = useAppContext();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isItemPageOpen, setIsItemPageOpen] = useState(false);
  const [isContentPageOpen, setIsContentPageOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
    setIsItemPageOpen(true);
    navigate(`/tv/${itemId}`, { state: { backgroundLocation: location } });
  };

  const handleCloseItemPage = () => {
    setIsItemPageOpen(false);
    setSelectedItemId(null);
    navigate(-1);
  };
  const handleTVShowClick = (tvId) => {
    setSelectedItemId(tvId);
    setIsContentPageOpen(true);
    navigate(`/tv/${tvId}`);
  };
  const firstTVShow = popularTVShows[0];

  return (
    <div>
      {firstTVShow && (
        <Box sx={{ position: "relative", width: "100%", height: "500px" }}>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/original${firstTVShow.backdrop_path}`}
            alt={firstTVShow.name}
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
            <Typography variant="h2">{firstTVShow.name}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleItemClick(firstTVShow.id)}
            >
              Watch Now
            </Button>
          </Box>
        </Box>
      )}
      <div className="Layout">
        <FeatureSlider
          items={popularTVShows}
          genres={genres}
          onItemClick={handleTVShowClick}
          contentType="tv"
        />
      </div>

      {isContentPageOpen && selectedItemId && (
        <ContentPage
          open={isContentPageOpen}
          handleClose={handleCloseItemPage}
          id={selectedItemId}
          type="tv"
          isModal
        />
      )}
    </div>
  );
};

export default TVShows;
