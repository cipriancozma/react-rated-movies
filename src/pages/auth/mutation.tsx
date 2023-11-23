const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzdlMzMzMWVlZTRlYTVkZmZiNmZkZmVjNjcxMjFkMiIsInN1YiI6IjYxYzFiYWRkMTYyYmMzMDA2MGJiYzM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTFk-qWxz_bCR8G_NBcoO33uiY3-5KnNo-Rof9QPV-o",
  },
};

export const mutationLogin = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    options
  );

  return response.json();
};
