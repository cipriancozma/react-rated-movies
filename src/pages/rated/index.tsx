import { useState } from "react";
import { Container, Menu, Segment, Header, Loader } from "semantic-ui-react";
import { DisplayType } from "../../types/types";
import { useQuery } from "@tanstack/react-query";
import { fetchingRatedMovies, fetchingRatedTVShows } from "./query";
import { Column } from "../home/column";

export const Rated = () => {
  const [activeTab, setActiveTab] = useState<DisplayType>(DisplayType.Movies);

  const {
    data: ratedMovie,
    isLoading: isLoadingRatedMovie,
    isError: errorRatedMovie,
  } = useQuery({
    queryKey: ["ratedMovie"],
    queryFn: fetchingRatedMovies,
  });

  const {
    data: ratedTV,
    isLoading: isLoadingRatedTV,
    isError: errorRatedTV,
  } = useQuery({
    queryKey: ["ratedTV"],
    queryFn: fetchingRatedTVShows,
  });

  if (isLoadingRatedMovie || isLoadingRatedTV) return <Loader active />;

  if (errorRatedMovie || errorRatedTV)
    return <div>Opsss...We encountered an error...</div>;

  return (
    <Container style={{ marginTop: 50 }}>
      <Menu pointing secondary>
        <Menu.Item
          name="Movies"
          active={activeTab === DisplayType.Movies}
          onClick={() => setActiveTab(DisplayType.Movies)}
        />
        <Menu.Item
          name="TV"
          active={activeTab === DisplayType.TVShows}
          onClick={() => setActiveTab(DisplayType.TVShows)}
        />
      </Menu>
      <Segment>
        {activeTab === DisplayType.Movies ? (
          <div>
            {" "}
            <Header as={"h2"}>Rated Movies</Header>{" "}
            <Column
              data={ratedMovie?.results}
              displayType={DisplayType.Movies}
              isRated
            />
          </div>
        ) : (
          <div>
            {" "}
            <Header as={"h2"}>Rated TV Shows</Header>{" "}
            <Column
              data={ratedTV?.results}
              displayType={DisplayType.TVShows}
              isRated
            />
          </div>
        )}
      </Segment>
    </Container>
  );
};
