export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Movie {
    id: number;
    original_title: string;
    backdrop_path: string;
    genre_ids: number[];
  }
  

  export interface AppContextType {
    genres: Genre[] | any
    popularMovies: Movie[] | any;
    popularTVShows: Movie[] | any;
    searchResults: any;
    setGenres: (genres: Genre[]) => void;
    setPopularMovies: (movies: Movie[]) => void;
    searchMoviesByKeyword:any;
    currentPage:string|any;
    setCurrentPage:any;
  }
  