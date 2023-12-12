const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzdlMzMzMWVlZTRlYTVkZmZiNmZkZmVjNjcxMjFkMiIsInN1YiI6IjYxYzFiYWRkMTYyYmMzMDA2MGJiYzM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTFk-qWxz_bCR8G_NBcoO33uiY3-5KnNo-Rof9QPV-o",
  },
};

export const fetchingMovies = async (page: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    options
  );

  return response.json();
};

export const fetchingTVShows = async (page: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`,
    options
  );

  return response.json();
};
