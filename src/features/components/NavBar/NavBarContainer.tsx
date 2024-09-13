import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import NavBarItem from "./NavBarItem";
import SearchBar from "./SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppProvider";
import "./NavBar.css";

const NavBarContainer = () => {
  const itemList = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];
  const navigate = useNavigate();
  const { setCurrentPage } = useAppContext();

  const handleNavClick = (path: string) => {
    setCurrentPage(path);
    navigate(path);
  };

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
              <NavBarItem
                key={item}
                name={item}
                onClick={() =>
                  handleNavClick(
                    `/${item
                      .toLowerCase()
                      .replace(/ & /g, "-")
                      .replace(/ /g, "")}`
                  )
                }
              />
            ))}
          </Box>
          <Box className="Spacer" />
          <SearchBar />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBarContainer;
