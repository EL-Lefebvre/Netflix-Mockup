import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  IconButton,
  Paper,
  Grid,
} from "@mui/material";
import { useAppContext } from "../AppProvider";
import CloseIcon from "@mui/icons-material/Close";

const DetailsPage = ({ open, handleClose, id, type, isModal }) => {
  const { getMovieById, getTVById } = useAppContext();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      let data;
      if (type === "movie") {
        data = await getMovieById(id);
      } else if (type === "tv") {
        data = await getTVById(id);
      }
      setItem(data);
    };
    if (id) {
      fetchItem();
    }
  }, [id, type, getMovieById, getTVById]);

  if (!item) return <Typography>Loading...</Typography>;

  const genreList = item.genres.map((genre) => genre.name).join(", ");
  const releaseYear = item.release_date
    ? item.release_date.substring(0, 4)
    : "Unknown";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{
        borderRadius: "16px",
      }}
      PaperProps={{
        onClick: (e) => e.stopPropagation(),
      }}
    >
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "#333",
          color: "#fff",
          padding: 2,
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Card sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
          <CardMedia
            component="img"
            height="500"
            image={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt={item.title || item.name}
          />
          <CardContent>
            <Typography variant="h4" color="white" gutterBottom>
              {item.title || item.name}
            </Typography>
            <Typography variant="body1" color="white" paragraph>
              {releaseYear}
            </Typography>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={6}>
                <Typography variant="body1" paragraph color="white">
                  {item.overview}
                </Typography>
              </Grid>
              <Grid item xs={6} alignItems="flex-end">
                <Typography variant="body1" gutterBottom color="white">
                  Genres: {genreList}
                </Typography>
                {item.production_companies &&
                  item.production_companies.map((company) => (
                    <Typography variant="body1" key={company.id} color="white">
                      {company.name}
                    </Typography>
                  ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </Dialog>
  );
};

export default DetailsPage;
