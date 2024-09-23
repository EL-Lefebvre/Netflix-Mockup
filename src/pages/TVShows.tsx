import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FeatureSlider from "../features/components/Carousel/FeatureSlider";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
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
        <Box sx={{ position: "relative", width: "100%", height: "600px" }}>
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
                onClick={() => handleItemClick(firstTVShow.id)}
              >
                <Typography>Play</Typography>
              </Button>
              <Button
                startIcon={<InfoIcon />}
                variant="contained"
                onClick={() => handleItemClick(firstTVShow.id)}
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
