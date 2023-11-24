import { Segment, Header, Loader, Grid, Image, List } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTVDetails } from "./query";

export const TV = () => {
  const { id } = useParams<string>();

  if (!id) return <div>Invalid Id</div>;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tv"],
    queryFn: () => fetchTVDetails(id),
  });

  if (isLoading) return <Loader active />;

  if (isError) return <div>Opsss...We encountered an error...</div>;

  console.log({ data });

  const genres = data?.genres?.map((genre: any) => {
    return <span key={genre.id}>{genre.name} | </span>;
  });

  const spokenLanguages = data?.spoken_languages?.map(
    (language: any, idx: number) => {
      return <List.Item key={idx}>{language.english_name}</List.Item>;
    }
  );

  const productionCompanies = data?.production_companies?.map(
    (company: any) => {
      return (
        <Segment key={company.id}>
          {company.name}
          <Image
            size="small"
            src={
              company.logo_path
                ? `https://image.tmdb.org/t/p/original/${company.logo_path}`
                : ""
            }
          />
        </Segment>
      );
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
                  <List.Header>Genres: {genres}</List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>Name: </List.Header>
                  {data.name}
                </List.Item>
                <List.Item>
                  <List.Header>Homepage: </List.Header>
                  <a href={data.homepage}> {data.homepage}</a>
                </List.Item>
                <List.Item>
                  <List.Header>Popularity: </List.Header>
                  {data.popularity}
                </List.Item>
                <List.Item>
                  <List.Header>Status: </List.Header>
                  {data.status}
                </List.Item>
                <List.Item>
                  <List.Header>Spoken Languages: </List.Header>
                  {spokenLanguages}
                </List.Item>
                <List.Item>
                  <List.Header>Type: </List.Header>
                  {data.type}
                </List.Item>
                <List.Item>
                  <List.Header>Production Companies: </List.Header>
                  {productionCompanies}
                </List.Item>
                <List.Item>
                  <List.Header>Original Language: </List.Header>
                  {data?.original_language?.toUpperCase()}
                </List.Item>
                <List.Item>
                  <List.Header>Vote average: </List.Header>
                  {data?.vote_average?.toFixed(2)}
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
