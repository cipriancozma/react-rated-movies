
const apiKey = import.meta.env.VITE_API_KEY;
  
  export const handleRateMovie = async (movieId: number, rating: number) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${localStorage.getItem("sessionId")}&api_key=${apiKey}`,
      {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ value: rating }),
      }
    );
  
    return response.json();
  };

  export const handleRateTV = async (tvId: number, rating: number) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/rating?guest_session_id=${localStorage.getItem("sessionId")}&api_key=${apiKey}`,
        {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": 'application/json;charset=utf-8',
              },
              body: JSON.stringify({ value: rating })
          }
    );
  
    return response.json();
  };
  