import { Grid, Typography } from "@mui/material";
import { useAppContext } from "../AppProvider";
import FeatureCard from "../features/components/FeatureCard/FeatureCard";

const SearchResults = () => {
  const { searchResults } = useAppContext();
  const imageUrl = "https://image.tmdb.org/t/p/w500";
  if (searchResults.length === 0) {
    return <Typography variant="h6">No results found</Typography>;
  }
  console.log(searchResults);
  return (
    <div>
      <div className="Layout" style={{ paddingTop: "100px" }}>
        <Grid container spacing={3}>
          {searchResults.map(
            (movie) =>
              movie.backdrop_path && (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <FeatureCard
                    name={movie.original_title || movie.name}
                    media={`${imageUrl}${movie.backdrop_path}`}
                    key={movie.id}
                  />
                </Grid>
              )
          )}
        </Grid>
      </div>
    </div>
  );
};

export default SearchResults;
