import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useAppContext } from "../AppProvider";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieById } = useAppContext();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieById(id);
      setMovie(data);
    };
    fetchMovie();
  }, [id, getMovieById]);

  if (!movie) return <Typography>Loading...</Typography>;
  console.log(movie);
  return (
    <Box sx={{ padding: 2 }}>
      <Card>
        <CardMedia
          component="img"
          height="500"
          image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} // Adjust this URL if needed
          alt={movie.title}
        />
        <CardContent>
          <Box>
            <Typography variant="h4" gutterBottom>
              {movie.title}
            </Typography>
            <Box className="Details">
              <Typography variant="body1" paragraph>
                {movie.release_date}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Genres
              </Typography>
              <Box className="Listing">
                {movie.genres.map((genre) => (
                  <Typography variant="body1">{genre.name}</Typography>
                ))}
              </Box>
            </Box>
          </Box>
          {movie.production_companies &&
            movie.production_companies.map((company) => (
              <Typography variant="body1">{company.name}</Typography>
            ))}

          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MoviePage;
