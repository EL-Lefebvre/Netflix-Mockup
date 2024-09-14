import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./FeatureCard.css";

const FeatureCard = ({ movieId, name, media }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(movieId);
    navigate(`/movie/${movieId}`);
  };
  return (
    <Card
      className="CardLayout"
      onClick={handleClick}
      sx={{ cursor: "pointer" }}
    >
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

export default FeatureCard;
