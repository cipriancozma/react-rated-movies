import { ColumnProps, DisplayData, DisplayType } from "../../types/types";
import { Grid, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const Column = (props: ColumnProps) => {
  const { data, displayType } = props;
  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {data.map((displayData: DisplayData) => (
        <Grid.Column key={displayData.id}>
          <Card.Group>
            <Link
              to={`/${displayType === DisplayType.Movies ? "movie" : "tv"}/${
                displayData.id
              }`}
            >
              <Card
                fluid
                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                header={
                  displayType === DisplayType.Movies
                    ? displayData.title
                    : displayData.name
                }
                meta={`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average} `}
                description={displayData.overview.slice(0, 350) + "..."}
              />
            </Link>
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};
