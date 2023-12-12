import { ColumnProps, DisplayData, DisplayType } from "../../types/types";
import {
  Grid,
  Card,
  Form,
  Label,
  Pagination,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { handleRateMovie, handleRateTV } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Column = (props: ColumnProps) => {
  const {
    data,
    displayType,
    isRated,
    isPaginated,
    handlePageChange,
    page,
    totalPages,
  } = props;
  const [rating, setRating] = useState<number>(0);

  const handleSuccess = () => {
    toast.success("Rating was added!");
  };

  const handleError = () => {
    toast.error("Try again later...");
  };

  const { mutate: rateMovie } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => handleRateMovie(id, rating),
    onSuccess: handleSuccess,
    onError: handleError,
  });
  const { mutate: rateTV } = useMutation({
    mutationKey: ["rateTV"],
    mutationFn: (id: number) => handleRateTV(id, rating),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleRate = displayType === DisplayType.Movies ? rateMovie : rateTV;

  return (
    <>
      <Grid
        columns={3}
        stackable
        centered
        verticalAlign="top"
        padded="vertically"
      >
        {data?.length > 0 ? (
          data?.map((displayData: DisplayData) => (
            <Grid.Column key={displayData.id}>
              <Card.Group>
                <Link
                  to={`/${
                    displayType === DisplayType.Movies ? "movie" : "tv"
                  }/${displayData.id}`}
                >
                  <Card
                    style={{ height: 820 }}
                    fluid
                    image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                    header={
                      displayType === DisplayType.Movies
                        ? displayData.title
                        : displayData.name
                    }
                    meta={`Release Date: ${
                      displayType === DisplayType.Movies
                        ? displayData.release_date
                        : "N/A"
                    } | Rating: ${displayData.vote_average.toFixed(2)} `}
                    description={displayData.overview.slice(0, 350) + "..."}
                  />
                  {isRated && <Label>Your rating: {displayData?.rating}</Label>}
                </Link>
                <Form style={{ marginTop: 10 }}>
                  <Form.Group inline>
                    <Form.Field>
                      <Form.Input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        onChange={(e) => setRating(Number(e.target.value))}
                        action={{
                          color: "black",
                          labelPosition: "right",
                          icon: "star",
                          content: "Rate",
                          onClick: () => {
                            handleRate(displayData.id);
                          },
                        }}
                      />
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Card.Group>
            </Grid.Column>
          ))
        ) : (
          <Message
            style={{ width: "50%" }}
            size="small"
            compact
            icon="exclamation triangle"
            header="What have you searched?"
            content="No Data Found."
          />
        )}
      </Grid>
      {isPaginated && totalPages && data.length > 0 && (
        <Pagination
          defaultActivePage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};
