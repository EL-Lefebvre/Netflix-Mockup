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

  const handleSearch = () => {
    if (keyword.trim()) {
      searchMoviesByKeyword(keyword);
      navigate("/search");
    }
  };

  return (
    <Box className={`search-bar ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <Box className="search-input-container">
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "200px",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <IconButton
            className="searchButton"
            onClick={() => {
              handleSearch();
              setIsOpen(false);
            }}
          >
            <SearchIcon className="searchButton" />
          </IconButton>
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
