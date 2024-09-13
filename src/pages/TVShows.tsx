import React from "react";
import FeatureSlider from "../features/components/Carousel/FeatureSlider";
import { useAppContext } from "../AppProvider";
const TVShows = () => {
  const { genres = [], popularTVShows = [] } = useAppContext();
  console.log(genres);
  return (
    <div>
      <div className="Layout">
        <FeatureSlider movies={popularTVShows} genres={genres} />
      </div>
    </div>
  );
};

export default TVShows;
