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
    <Box className={`SearchBar ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <IconButton className="SearchButton" onClick={() => setIsOpen(true)}>
          <SearchIcon />
        </IconButton>
      )}
      <Box className="SearchInput">
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={keyword}
          onChange={(e) => handleSearch(e.target.value)}
          className="MainInput"
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
