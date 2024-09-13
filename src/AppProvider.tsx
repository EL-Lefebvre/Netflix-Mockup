import React, { useState, useEffect, useContext, createContext } from "react";
import {
  fetchGenres,
  fetchPopularMovies,
  fetchPopularTVShows,
  fetchSearch, // Import the search API function
} from "./APIs/MoviesAPI";
import { Genre, Movie, AppContextType } from "./types";

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // State for search results
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<string>("/home"); // State for current page

  // Fetch genres, movies, and TV shows
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

  // Function to perform search by keyword
  const searchMoviesByKeyword = async (keyword: string, pages = [1]) => {
    try {
      setLoading(true);
      const response = await fetchSearch(keyword, pages);
      setSearchResults(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        genres,
        popularMovies,
        popularTVShows,
        searchResults,
        searchMoviesByKeyword,
        currentPage,
        setCurrentPage,
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
