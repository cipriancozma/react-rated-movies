import { PaginationProps } from "semantic-ui-react";

export enum DisplayType {
  Movies = "movies",
  TVShows = "tvshows",
  Recommendations = "recommendations",
}

export interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
  rating?: string;
}

export interface ColumnProps {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
  isPaginated?: boolean;
  page?: number;
  totalPages?: number;
  handlePageChange?: (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: PaginationProps
  ) => void;
}
