import React from "react";
import { Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useAppContext } from "../AppProvider";

const SearchResults = () => {
  const { searchResults } = useAppContext();

  if (searchResults.length === 0) {
    return <Typography variant="h6">No results found</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Search Results
      </Typography>
      <Grid container spacing={3}>
        {searchResults.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                alt={movie.title || movie.name}
                height="200"
                image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {movie.title || movie.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {movie.overview || "No overview available"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchResults;
