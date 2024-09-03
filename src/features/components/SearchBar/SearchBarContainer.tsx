import React from "react";
import {
  AppBar,
  Box,
  CardContent,
  CardMedia,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchBarItem from "./SearchBarItem";
const SearchBarContainer = () => {
  const itemList = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",

            justifyItem: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {itemList.map((item) => (
            <SearchBarItem name={item} />
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBarContainer;
