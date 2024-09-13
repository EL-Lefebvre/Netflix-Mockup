import React from "react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";
const NavBarItem = ({ name }) => {
  const path = name.toLowerCase().replace(/ /g, "");

  return (
    <Link to={`/${path}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Typography>{name}</Typography>
    </Link>
  );
};

export default NavBarItem;
