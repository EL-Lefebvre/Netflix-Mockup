import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const PrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <IconButton
      className={className}
      onClick={onClick}
      style={{ position: "absolute", top: "50%", left: "10px", zIndex: 1 }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

export const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <IconButton
      className={className}
      onClick={onClick}
      style={{ position: "absolute", top: "50%", right: "10px", zIndex: 1 }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};
