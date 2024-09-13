import React, { useState, useEffect, useContext, createContext } from "react";

import {
  fetchGenres,
  fetchPopularMovies,
  fetchPopularTVShows,
} from "./APIs/MoviesAPI";
import { Genre, Movie, AppContextType } from "./types";

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
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
    const getPopularMovies = async () => {
      try {
        const pagesToFetch = [1, 2, 3, 4, 5];
        const response = await fetchPopularMovies(pagesToFetch);

        console.log(response);
        setPopularMovies(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const getPopularTVShows = async () => {
      try {
        const pagesToFetch = [1, 2, 3, 4, 5];
        const response = await fetchPopularTVShows(pagesToFetch);

        console.log(response);
        setPopularTVShows(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getGenres();
    getPopularMovies();
    getPopularTVShows();
  }, []);
  console.log(popularTVShows);
  return (
    <AppContext.Provider
      value={{
        genres,
        popularMovies,
        popularTVShows,
        setGenres,
        setPopularMovies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
