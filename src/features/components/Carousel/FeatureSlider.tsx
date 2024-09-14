import Slider from "react-slick";
import FeatureCard from "../FeatureCard/FeatureCard";
import { PrevArrow, NextArrow } from "../Carousel/Arrows";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeatureSlider.css";

const FeatureSlider = ({ movies, genres }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w500";

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
      if (!movie.genre_ids || movie.genre_ids.length === 0) return;

      let addedToGenre = false;

      for (const genreId of movie.genre_ids) {
        const genreName = genreMap[genreId];
        if (!genreName) continue;

        if (!genreGroups[genreName] && genreCount < maxGenres) {
          genreGroups[genreName] = [];
          genreCounts[genreName] = 0;
          genreCount++;
        }

        // Add the movie to the genre group if it's within the limit
        if (genreCounts[genreName] < maxMoviesPerGenre) {
          genreGroups[genreName].push(movie);
          genreCounts[genreName]++;
          addedToGenre = true;
          break;
        }
      }

      // Handle movies with undefined genre_ids or if no genre was assigned
      if (!addedToGenre) {
        const firstGenreId = movie.genre_ids[0];
        const firstGenreName = genreMap[firstGenreId];

        if (
          firstGenreName &&
          !genreGroups[firstGenreName] &&
          genreCount < maxGenres
        ) {
          genreGroups[firstGenreName] = [];
          genreCounts[firstGenreName] = 0;
          genreCount++;
        }

        if (firstGenreName && genreCounts[firstGenreName] < maxMoviesPerGenre) {
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
                <FeatureCard
                  movieId={movie.id}
                  name={movie.original_title || movie.name}
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
