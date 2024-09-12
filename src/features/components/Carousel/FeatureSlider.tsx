// FeatureSlider.js
import Slider from "react-slick";
import MovieCard from "../MovieCard"; // Adjust path if needed
import { PrevArrow, NextArrow } from "../Carousel/Arrows"; // Adjust path if needed
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeatureSlider.css";

const FeatureSlider = ({ movies, genres, imageUrl }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
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

  // Logic to only show 5 movies on carousel/slider
  const groupMoviesByGenresWithLimit = (movies, genres) => {
    const maxMoviesPerGenre = 8;
    const maxGenres = 5;

    const genreMap = genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});

    const genreCounts = {};
    const genreGroups = {};
    let genreCount = 0;

    movies.forEach((movie) => {
      let addedToGenre = false;

      for (const genreId of movie.genre_ids) {
        const genreName = genreMap[genreId];
        if (!genreName) continue;

        if (!genreGroups[genreName] && genreCount < maxGenres) {
          genreGroups[genreName] = [];
          genreCounts[genreName] = 0;
          genreCount++;
        }

        if (genreCounts[genreName] < maxMoviesPerGenre) {
          genreGroups[genreName].push(movie);
          genreCounts[genreName]++;
          addedToGenre = true;
          break;
        }
      }

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

  const moviesByFirstGenre = groupMoviesByGenresWithLimit(movies, genres);

  return (
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
  );
};

export default FeatureSlider;
