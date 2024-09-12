import React, { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./SearchBar.css";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className={`search-bar ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <Box className="search-input-container">
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "200px",
            }}
          />
          <IconButton className="searchButton" onClick={() => setIsOpen(false)}>
            <CloseIcon className="searchButton" />
          </IconButton>
        </Box>
      ) : (
        <IconButton onClick={() => setIsOpen(true)} className="searchButton">
          <SearchIcon className="searchButton" />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchBar;
