import MovieCard from "../features/components/MovieCard";
import { PrevArrow, NextArrow } from "../features/components/Carousel/Arrows";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

import { useAppContext } from "../AppProvider";
import FeatureSlider from "../features/components/Carousel/FeatureSlider";

const Home = () => {
  const { genres = [], popularMovies = [] } = useAppContext();
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <div className="Layout">
        <FeatureSlider
          movies={popularMovies}
          genres={genres}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  );
};

export default Home;
