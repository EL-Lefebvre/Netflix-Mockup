import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const arrowStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0, 0, 0, 0.5)",
  borderRadius: "50%",
  color: "#fff",
  padding: "10px",
  cursor: "pointer",
  zIndex: 1,
  height: "35px",
  width: "35px",
};
export const PrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <IconButton
      className={className}
      onClick={onClick}
      style={{
        ...arrowStyle,
        left: 10,
        position: "absolute",
        top: "50%",
        right: "10px",
        zIndex: 1,
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <IconButton
      className={className}
      onClick={onClick}
      style={{
        ...arrowStyle,
        right: 10,
        position: "absolute",
        top: "50%",

        zIndex: 1,
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};
