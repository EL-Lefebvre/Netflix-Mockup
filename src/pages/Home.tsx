import { useAppContext } from "../AppProvider";
import FeatureSlider from "../features/components/Carousel/FeatureSlider";
import "./Home.css";

const Home = () => {
  const { genres = [], popularMovies = [] } = useAppContext();

  return (
    <div>
      <div className="Layout">
        <FeatureSlider movies={popularMovies} genres={genres} />
      </div>
    </div>
  );
};

export default Home;
