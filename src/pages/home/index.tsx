import { useState } from "react";
import { Button, Input, Container } from "semantic-ui-react";
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

  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const filteredMovies = moviesData?.results?.filter((movie: any) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTVShows = tvData?.results?.filter((tvShow: any) =>
    tvShow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  console.log({ moviesData });
  console.log({ tvData });

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
      <Container style={{ marginTop: 20 }}>
        <Input
          placeholder="Search..."
          focus
          icon={"search"}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Container>
      <div style={{ marginTop: 20 }}>
        {displayType === DisplayType.Movies ? (
          <Column
            data={filteredMovies}
            displayType={DisplayType.Movies}
            isPaginated
          />
        ) : (
          <Column
            data={filteredTVShows}
            displayType={DisplayType.TVShows}
            isPaginated
          />
        )}
      </div>
    </div>
  );
};
