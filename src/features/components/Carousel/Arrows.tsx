import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const arrowStyle = {
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
  const isDisabled = className?.includes("slick-disabled");

  return (
    <IconButton
      className={`${className}`}
      onClick={isDisabled ? undefined : onClick}
      style={{
        ...arrowStyle,
        left: 10,
        opacity: isDisabled ? 0 : 1,
        cursor: isDisabled ? "default" : "pointer",
        position: "absolute",
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export const NextArrow = (props: any) => {
  const { className, onClick } = props;
  const isDisabled = className?.includes("slick-disabled");

  return (
    <IconButton
      className={`${className} nextArrow`}
      onClick={isDisabled ? undefined : onClick}
      style={{
        ...arrowStyle,
        right: 10,
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? "default" : "pointer",
        position: "absolute",
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};
