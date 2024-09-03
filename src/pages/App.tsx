import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SearchBarContainer from "../features/components/SearchBar/SearchBarContainer";
import Home from "./Home";
function App() {
  return (
    <Router>
      <div className="App">
        <SearchBarContainer />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
