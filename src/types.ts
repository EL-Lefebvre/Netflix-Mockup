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
    searchMoviesByKeyword: (keyword: string, pages?: number[]) => Promise<void>;
    getMovieById: (id: string) => Promise<Movie | null>; 
    getTVById: (id: string) => Promise<Movie | null>; 
    currentPage:string|any;
    setCurrentPage:any;
  }
  