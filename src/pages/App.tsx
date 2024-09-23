import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import NavBarContainer from "../features/components/NavBar/NavBarContainer";
import Home from "./Home";
import TVShows from "./TVShows";
import SearchResults from "./SearchResults";
import Footer from "../features/components/Footer/Footer";
import ContentPage from "./DetailsPage";
import { Box } from "@mui/material";

const App = () => {
  const location = useLocation();
  const state = location.state && location.state.backgroundLocation;

  return (
    <Box className="App">
      <NavBarContainer />
      <Box className="MainContent">
        <Routes location={state || location}>
          <Route path="/" element={<Home />} />
          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {state && (
          <Routes>
            <Route
              path="/movie/:id"
              element={
                <ContentPage
                  id={""}
                  type="movie"
                  open
                  handleClose={() => {}}
                  isModal
                />
              }
            />
            <Route
              path="/tvshows/:id"
              element={
                <ContentPage
                  id={""}
                  type="tv"
                  open
                  handleClose={() => {}}
                  isModal
                />
              }
            />
          </Routes>
        )}

        <Footer />
      </Box>
    </Box>
  );
};

export default App;
