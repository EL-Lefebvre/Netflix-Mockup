import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import NavBarItem from "./NavBarItem";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import "./NavBar.css";

const NavBarContainer = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const itemList = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar className="NavLayout">
          <Box className="TitleContainer">
            <Typography sx={{ color: "red", fontWeight: "bold" }}>
              MOVIEFLIX
            </Typography>
          </Box>
          <Box className="NavItems">
            {itemList.map((item) => (
              <NavBarItem name={item} />
            ))}
          </Box>
          <Box className="Spacer" />
          <Box className="SearchContainer">
            {searchVisible ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                  sx={{ marginRight: 1, backgroundColor: "white" }}
                />
                <IconButton onClick={() => setSearchVisible(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => setSearchVisible(true)}>
                <SearchIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBarContainer;
