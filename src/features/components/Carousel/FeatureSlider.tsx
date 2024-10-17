import Slider from "react-slick";
import FeatureCard from "../FeatureCard/FeatureCard";
import { PrevArrow, NextArrow } from "../Carousel/Arrows";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeatureSlider.css";
import { useState } from "react";
import ContentPage from "../../../pages/DetailsPage";

interface Genre {
  id: number;
  name: string;
}

interface Item {
  id: number;
  original_title?: string;
  name?: string;
  backdrop_path?: string;
  genre_ids?: number[];
}

interface FeatureSliderProps {
  items: Item[];
  genres: Genre[];
  onItemClick: (itemId: number | string) => void;
  contentType: string;
}

const FeatureSlider: React.FC<FeatureSliderProps> = ({
  items,
  genres,
  onItemClick,
  contentType,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isContentPageOpen, setIsContentPageOpen] = useState(false);
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 3840,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleItemClick = (itemId: number) => {
    const numericId =
      typeof itemId === "string" ? parseInt(itemId, 10) : itemId;
    setSelectedItemId(numericId);
    setIsContentPageOpen(true);
    onItemClick(numericId);
  };

  const groupItemsByGenresWithLimit = (items: Item[], genres: Genre[]) => {
    const maxItemsPerGenre = 8;
    const maxGenres = 5;

    const genreMap = genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {} as Record<number, string>);

    const genreCounts: Record<string, number> = {};
    const genreGroups: Record<string, Item[]> = {};
    let genreCount = 0;

    items.forEach((item) => {
      if (!item.genre_ids || item.genre_ids.length === 0) return;

      let addedToGenre = false;

      for (const genreId of item.genre_ids) {
        const genreName = genreMap[genreId];
        if (!genreName) continue;

        if (!genreGroups[genreName] && genreCount < maxGenres) {
          genreGroups[genreName] = [];
          genreCounts[genreName] = 0;
          genreCount++;
        }

        // Add the item to the genre group if it's within the limit
        if (genreCounts[genreName] < maxItemsPerGenre) {
          genreGroups[genreName].push(item);
          genreCounts[genreName]++;
          addedToGenre = true;
          break;
        }
      }

      // Handle items with undefined genre_ids or if no genre was assigned
      if (!addedToGenre) {
        const firstGenreId = item.genre_ids[0];
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

        if (firstGenreName && genreCounts[firstGenreName] < maxItemsPerGenre) {
          genreGroups[firstGenreName].push(item);
          genreCounts[firstGenreName]++;
        }
      }
    });

    // Remove genres that have fewer than 5 items
    Object.keys(genreGroups).forEach((genreName) => {
      if (genreGroups[genreName].length < 5) {
        delete genreGroups[genreName];
      }
    });

    return genreGroups;
  };

  const itemsByFirstGenre = groupItemsByGenresWithLimit(items, genres);

  return (
    <div className="Layout">
      {Object.keys(itemsByFirstGenre).map((genreName) => (
        <div className="Category" key={genreName}>
          <div className="CategoryTitle">{genreName}</div>
          <div className="MovieList">
            <Slider {...settings}>
              {itemsByFirstGenre[genreName].map((item) => (
                <div key={item.id} onClick={() => handleItemClick(item.id)}>
                  <FeatureCard
                    itemId={item.id}
                    name={item.original_title || item.name}
                    media={`${imageUrl}${item.backdrop_path}`}
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ))}
      {isContentPageOpen && selectedItemId && (
        <ContentPage
          open={isContentPageOpen}
          handleClose={() => setIsContentPageOpen(false)}
          id={selectedItemId}
          type={contentType}
          isModal
        />
      )}
    </div>
  );
};

export default FeatureSlider;
