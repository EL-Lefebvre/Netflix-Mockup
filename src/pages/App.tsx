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
const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBarContainer />
        <div className="content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/tvshows" element={<TVShows />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
