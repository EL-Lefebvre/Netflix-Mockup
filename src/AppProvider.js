import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { AppContext } from "./AppContext";

const AppProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("/"); // Adjust URL if needed
        setGenres(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <AppContext.Provider value={{ genres, loading, error }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
