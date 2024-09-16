import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "../src/pages/App";
import { BrowserRouter as Router } from "react-router-dom";

import { AppProvider } from "./AppProvider";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
