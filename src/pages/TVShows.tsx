import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FeatureSlider from "../features/components/Carousel/FeatureSlider";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import { useAppContext } from "../AppProvider";
import DetailsPage from "./DetailsPage";

const TVShows = () => {
  const { genres = [], popularTVShows = [] } = useAppContext();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isContentPageOpen, setIsContentPageOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (itemId: number) => {
    setSelectedItemId(itemId);
    setIsContentPageOpen(true);
    navigate(`/tvshows/${itemId}`, { state: { backgroundLocation: location } });
  };

  const handleCloseContentPage = () => {
    setIsContentPageOpen(false);
    setSelectedItemId(null);
    navigate(-1);
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
            onClick={() => handleItemClick(firstTVShow.id)}
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
          </Box>
        </Box>
      )}

      <div className="Layout">
        <FeatureSlider
          items={popularTVShows}
          genres={genres}
          onItemClick={handleItemClick}
          contentType="tv"
        />
      </div>

      {isContentPageOpen && selectedItemId && (
        <DetailsPage
          open={isContentPageOpen}
          handleClose={handleCloseContentPage}
          id={selectedItemId}
          type="tv"
          isModal
        />
      )}
    </div>
  );
};

export default TVShows;
