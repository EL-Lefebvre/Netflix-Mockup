import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
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
            backgroundColor: "#141414",
          }}
        >
          <Typography sx={{ color: "red", fontWeight: "bold" }}>
            MOVIEFLIX
          </Typography>
          {itemList.map((item) => (
            <SearchBarItem name={item} />
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBarContainer;