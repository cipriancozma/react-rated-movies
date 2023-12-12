import { useState } from "react";
import { Button, Input, Container, PaginationProps } from "semantic-ui-react";
import { DisplayType } from "../../types/types";
import { fetchingMovies, fetchingTVShows } from "./query";
import { useQuery } from "@tanstack/react-query";
import { Column } from "./column";
import { fetchRecommendations } from "../recommendations/query";

export const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Recommendations
  );

  const colorMovies = displayType === DisplayType.Movies ? "blue" : undefined;
  const colorTVShows = displayType === DisplayType.TVShows ? "blue" : undefined;
  const colorRecommendations =
    displayType === DisplayType.Recommendations ? "blue" : undefined;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
  } = useQuery({
    queryKey: ["movies", currentPage],
    queryFn: () => fetchingMovies(currentPage),
  });

  const {
    data: tvData,
    isLoading: isLoadingTV,
    isError: isErrorTV,
  } = useQuery({
    queryKey: ["tv", currentPage],
    queryFn: () => fetchingTVShows(currentPage),
  });

  const {
    data: recommendationsData,
    isLoading: isLoadingRecommendations,
    isError: isErrorRecommendations,
  } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => fetchRecommendations("100"),
  });

  console.log({ recommendationsData });

  if (isLoadingMovies || isLoadingTV || isLoadingRecommendations)
    return <div>Loading...</div>;

  if (isErrorMovies || isErrorTV || isErrorRecommendations)
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

  const handlePageChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: PaginationProps
  ) => {
    const newPage = data.activePage as number;
    setCurrentPage(newPage);
  };

  console.log({ moviesData });
  // console.log({ tvData });

  return (
    <div style={{ marginTop: 50, height: "auto" }}>
      <Button.Group>
        <Button
          color={colorRecommendations}
          onClick={() => setDisplayType(DisplayType.Recommendations)}
        >
          Recommendations
        </Button>
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
        {displayType === DisplayType.Recommendations && <p>Hello</p>}
        {displayType === DisplayType.Movies && (
          <Column
            data={filteredMovies}
            displayType={DisplayType.Movies}
            isPaginated
            handlePageChange={handlePageChange}
            page={moviesData?.page}
            totalPages={moviesData?.total_pages}
          />
        )}
        {displayType === DisplayType.TVShows && (
          <Column
            data={filteredTVShows}
            displayType={DisplayType.TVShows}
            isPaginated
            handlePageChange={handlePageChange}
            page={tvData?.page}
            totalPages={tvData?.total_pages}
          />
        )}
      </div>
    </div>
  );
};
