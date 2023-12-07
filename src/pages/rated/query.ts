
const apiKey = import.meta.env.VITE_API_KEY;

  export const fetchingRatedMovies = async () => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      console.error("No session ID found");
      return;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${apiKey}`);
  
    return response.json();
  };
  
  export const fetchingRatedTVShows = async () => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      console.error("No session ID found");
      return;
    }
    const response = await fetch(
        `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${apiKey}`);
    
      return response.json();
  
  };
  