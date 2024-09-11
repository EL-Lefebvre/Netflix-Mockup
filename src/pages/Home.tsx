import MovieCard from "../features/components/MovieCard";
import { PrevArrow, NextArrow } from "../features/Carousel/Arrows";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

import { useAppContext } from "../AppProvider";

const Home = () => {
  const { genres = [], popularMovies = [] } = useAppContext();
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const groupMoviesByGenresWithLimit = (movies, genres) => {
    const maxMoviesPerGenre = 8;
    const maxGenres = 5;

    // Create a genre map for quick lookup
    const genreMap = genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});

    const genreCounts = {};
    const genreGroups = {};
    let genreCount = 0;

    // Loop through the movies and assign them to genres
    movies.forEach((movie) => {
      let addedToGenre = false;

      // Try adding the movie to each of its genres, starting with the first one
      for (const genreId of movie.genre_ids) {
        const genreName = genreMap[genreId];

        // Skip if the genre is not in the genre map
        if (!genreName) continue;

        // Create a new genre group if it doesn't exist and we haven't hit the maxGenres limit
        if (!genreGroups[genreName] && genreCount < maxGenres) {
          genreGroups[genreName] = [];
          genreCounts[genreName] = 0;
          genreCount++;
        }

        // Add the movie to the genre group if it has fewer than maxMoviesPerGenre
        if (genreCounts[genreName] < maxMoviesPerGenre) {
          genreGroups[genreName].push(movie);
          genreCounts[genreName]++;
          addedToGenre = true;
          break;
        }
      }

      // If the movie wasn't added to any genre, fallback to the first genre
      if (!addedToGenre) {
        const firstGenreId = movie.genre_ids[0];
        const firstGenreName = genreMap[firstGenreId];

        if (!genreGroups[firstGenreName]) {
          genreGroups[firstGenreName] = [];
          genreCounts[firstGenreName] = 0;
          genreCount++;
        }

        if (genreCounts[firstGenreName] < maxMoviesPerGenre) {
          genreGroups[firstGenreName].push(movie);
          genreCounts[firstGenreName]++;
        }
      }
    });

    // Remove genres that have fewer than 5 movies
    Object.keys(genreGroups).forEach((genreName) => {
      if (genreGroups[genreName].length < 5) {
        delete genreGroups[genreName];
      }
    });

    return genreGroups;
  };

  const moviesByFirstGenre = groupMoviesByGenresWithLimit(
    popularMovies,
    genres
  );
  return (
    <div>
      <div className="Layout">
        {Object.keys(moviesByFirstGenre).map((genreName) => (
          <div className="Category" key={genreName}>
            <div className="CategoryTitle">{genreName}</div>
            <div className="MovieList">
              <Slider {...settings}>
                {moviesByFirstGenre[genreName].map((movie) => (
                  <MovieCard
                    name={movie.original_title}
                    media={`${imageUrl}${movie.backdrop_path}`}
                    key={movie.id}
                  />
                ))}
              </Slider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
