import React, { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../AppProvider";
import "./SearchBar.css";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { searchMoviesByKeyword } = useAppContext();
  const navigate = useNavigate();

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);
    if (newKeyword.trim()) {
      searchMoviesByKeyword(newKeyword);
      navigate("/search");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setKeyword("");
    navigate("/home");
  };

  return (
    <Box className="search-bar">
      {!isOpen && (
        <IconButton className="search-button" onClick={() => setIsOpen(true)}>
          <SearchIcon />
        </IconButton>
      )}
      <Box
        sx={{
          width: isOpen ? "400px" : "0",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: " width 1s ease, transform 1s ease",
        }}
        className="search-input-container"
      >
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={keyword}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
            width: "100%",
            height: "50px",
            fontSize: "16px",
          }}
        />

        <IconButton sx={{ color: "white" }} onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
      </Box>
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{ color: "white", position: "absolute", right: 0 }}
        >
          <SearchIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchBar;
