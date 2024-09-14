import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import NavBarContainer from "../features/components/NavBar/NavBarContainer";
import Home from "./Home";
import TVShows from "./TVShows";
import SearchResults from "./SearchResults";
import Footer from "../features/components/Footer/Footer";
import MoviePage from "./MoviePage";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Box className="App">
        <NavBarContainer />
        <Box className="MainContent">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/tvshows" element={<TVShows />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
          <Footer />
        </Box>
      </Box>
    </Router>
  );
};

export default App;
