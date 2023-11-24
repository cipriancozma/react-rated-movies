import { useState } from "react";
import { Button } from "semantic-ui-react";
import { DisplayType } from "../../types/types";
import { fetchingMovies, fetchingTVShows } from "./query";
import { useQuery } from "@tanstack/react-query";
import { Column } from "./column";

export const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );
  const colorMovies = displayType === DisplayType.Movies ? "blue" : undefined;
  const colorTVShows = displayType === DisplayType.TVShows ? "blue" : undefined;

  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
  } = useQuery({ queryKey: ["movies"], queryFn: fetchingMovies });

  const {
    data: tvData,
    isLoading: isLoadingTV,
    isError: isErrorTV,
  } = useQuery({ queryKey: ["tv"], queryFn: fetchingTVShows });

  if (isLoadingMovies || isLoadingTV) return <div>Loading...</div>;

  if (isErrorMovies || isErrorTV)
    return <div>Opsss...We are trying to solve it asap.</div>;

  return (
    <div style={{ marginTop: 50, height: "auto" }}>
      <Button.Group>
        <Button
          color={colorMovies}
          onClick={() => setDisplayType(DisplayType.Movies)}
        >
          Movies
        </Button>
        <Button
          color={colorTVShows}
          onClick={() => setDisplayType(DisplayType.TVShows)}
        >
          TV Shows
        </Button>
      </Button.Group>
      <div style={{ marginTop: 20 }}>
        {displayType === DisplayType.Movies ? (
          <Column data={moviesData.results} displayType={DisplayType.Movies} />
        ) : (
          <Column data={tvData.results} displayType={DisplayType.TVShows} />
        )}
      </div>
    </div>
  );
};
