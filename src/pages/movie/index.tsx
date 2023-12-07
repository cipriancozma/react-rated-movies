import { Segment, Header, Loader, Grid, Image, List } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "./query";

export const Movie = () => {
  const { id } = useParams<string>();

  if (!id) return <div>Invalid Id</div>;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoading) return <Loader active />;

  if (isError) return <div>Opsss...We encountered an error...</div>;

  const genres = data?.genres?.map((genre: any, idx: number) => {
    return <span key={idx}>{genre.name} | </span>;
  });

  const spokenLanguages = data?.spoken_languages?.map(
    (language: any, idx: number) => {
      return <List.Item key={idx}>{language.english_name}</List.Item>;
    }
  );
  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data.title}</Header>
        <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "10",
                }}
              >
                <Image
                  size="medium"
                  centered
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                <List.Item>
                  <List.Header>Tagline: </List.Header>
                  {data.tagline}
                </List.Item>
                <List.Item>
                  <List.Header>Genres: {genres}</List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>Budget: </List.Header>
                  {data.budget}$
                </List.Item>
                <List.Item>
                  <List.Header>IMDB ID: </List.Header>
                  {data.imdb_id}
                </List.Item>
                <List.Item>
                  <List.Header>Popularity: </List.Header>
                  {data.popularity}
                </List.Item>
                <List.Item>
                  <List.Header>Release Date: </List.Header>
                  {data.release_date}
                </List.Item>
                <List.Item>
                  <List.Header>Spoken Languages: </List.Header>
                  {spokenLanguages}
                </List.Item>
                <List.Item>
                  <List.Header>Original Language: </List.Header>
                  {data?.original_language?.toUpperCase()}
                </List.Item>
                <List.Item>
                  <List.Header>Vote average: </List.Header>
                  {data.vote_average.toFixed(2)}
                </List.Item>
                <List.Item>
                  <List.Header>Vote Count: </List.Header>
                  {data.vote_count}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
