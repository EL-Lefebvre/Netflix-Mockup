import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

interface NavBarItemProps {
  name: string;
  onClick: () => void;
}

const NavBarItem: React.FC<NavBarItemProps> = ({ name, onClick }) => {
  const path = name.toLowerCase().replace(/ /g, "");

  return (
    <Link
      to={`/${path}`}
      style={{ textDecoration: "none", color: "inherit" }}
      onClick={onClick}
    >
      <Typography>{name}</Typography>
    </Link>
  );
};

export default NavBarItem;
