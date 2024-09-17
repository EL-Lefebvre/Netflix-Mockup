import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import NavBarItem from "./NavBarItem";
import SearchBar from "./SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppProvider";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavBar.css";

const NavBarContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemList = ["Movies", "TV Shows", "New & Popular", "My List"];
  const navigate = useNavigate();
  const { setCurrentPage } = useAppContext();

  const handleNavClick = (path: string) => {
    setCurrentPage(path);
    navigate(path);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar className="NavLayout">
          <Box className="TitleContainer">
            <Link
              to={`/home`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography sx={{ color: "red", fontWeight: "bold" }}>
                MOVIEFLIX
              </Typography>
            </Link>
          </Box>

          <IconButton
            className="MenuButton"
            onClick={handleMenuToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
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
          {!isMenuOpen && <SearchBar />}
        </Toolbar>
      </AppBar>
      {isMenuOpen && (
        <Box
          className={`MobileMenu ${isMenuOpen ? "open" : ""}`}
          sx={{ display: { xs: "block", md: "none" }, zIndex: "3" }}
        >
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
      )}
    </Box>
  );
};

export default NavBarContainer;
