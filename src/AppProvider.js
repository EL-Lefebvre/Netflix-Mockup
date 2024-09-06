import React, { useState, useEffect } from "react";

import { AppContext } from "./AppContext";
import { fetchGenres } from "./APIs/MoviesAPI";

const AppProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetchGenres();

        setGenres(response.genres);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getGenres();
  }, []);

  return (
    <AppContext.Provider value={{ genres }}>{children}</AppContext.Provider>
  );
};

export { AppProvider, AppContext };
