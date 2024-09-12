import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBarContainer from "../features/components/NavBar/NavBarContainer";
import Home from "./Home";
function App() {
  return (
    <Router>
      <div className="App">
        <NavBarContainer />
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
