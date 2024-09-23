import React, { useState, useRef, useEffect } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import NavBarItem from "./NavBarItem";
import SearchBar from "./SearchBar/SearchBar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppProvider";
import MenuIcon from "@mui/icons-material/Menu";
import UseScrollPosition from "./UseScrollPosition";
import "./NavBar.css";

const NavBarContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemList = ["Movies", "TV Shows", "New & Popular", "My List"];

  const scrollY = UseScrollPosition();
  const navigate = useNavigate();
  const { setCurrentPage } = useAppContext();
  const menuRef = useRef(null);

  const handleNavClick = (path: string) => {
    setCurrentPage(path);
    navigate(path);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className="NavLayout">
          <Box className="TitleContainer">
            <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}>
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
          <NotificationsNoneIcon />
        </Toolbar>
      </AppBar>
      {isMenuOpen && (
        <Box
          ref={menuRef}
          className={`MobileMenu ${isMenuOpen ? "open" : ""}`}
          sx={{
            display: { xs: "block", md: "none" },
            zIndex: 3,
            position: "absolute",
            top: `${scrollY + 64}px`,
            width: "100%",
            backgroundColor: "grey",
            boxShadow: 3,
          }}
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
