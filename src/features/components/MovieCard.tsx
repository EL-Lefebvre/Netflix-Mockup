import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import "./MovieCard.css";

const MovieCard = ({ name, media }) => {
  return (
    <Card className="CardLayout">
      <div className="MediaWrapper">
        <CardMedia className="Media" image={media} title={`${name}-image`} />
        <div className="MovieCardOverlay">
          <Typography variant="h6" className="MovieCardTitle">
            {name}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
