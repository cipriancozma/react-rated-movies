export enum DisplayType {
  Movies = "movies",
  TVShows = "tvshows",
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
}
