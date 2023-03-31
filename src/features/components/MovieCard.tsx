import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./MovieCard.css";
const MovieCard = ({ name, media, key }) => {
  return (
    <Card key={key} className="CardLayout">
      <div></div>
      <CardMedia className="Media" image={media} title={`${name}-image`} />
      <CardContent className="Title">
        <Typography variant="h6">{name}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
