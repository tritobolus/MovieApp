import { createContext, useState,useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const WatchedContext = createContext();

export const WatchedProvider = ({ children }) => {
  const [watchedMovieId, setWatchedMovieId] = useState([]);
  const [watchedMovie, setWatchedMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userId} = useAuth();

  // --- FETCH WATCHLIST IDs ---
  const getWatchedId = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/movie/getwatched", {
        params: { userId },
      });
      setWatchedMovieId(res.data.watched || []);
    } catch (error) {
      console.error(error);
      setWatchedMovieId([]);
      setWatchedMovie([]);
    } finally {
      setLoading(false);
    }
  };

  // --- FETCH MOVIE DETAILS ---
  const getWatchedMovies = async () => {
    if (watchedMovieId.length === 0) {
      setWatchedMovie([]);
      return;
    }
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    };

    try {
      const movieDetails = await Promise.all(
        watchedMovieId.map(async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id.movie_id}?language=en-US`,
            options
          );
          return await res.json();
        })
      );
      setWatchedMovie(movieDetails);
    } catch (error) {
      console.error(error);
      setWatchedMovie([]);
    } finally {
      setLoading(false);
    }
  };

  
//   useEffect(() => {
//     if (userId) getWatchlistId();
//   }, [userId]);
  
//   useEffect(() => {
//     getWatchlistMovies();
//   }, [watchlistMovieId]);

  return (
    <WatchedContext.Provider
      value={{
       watchedMovie,
       loading,
       setWatchedMovieId,
       setWatchedMovie,
       watchedMovieId,
       getWatchedMovies,
       getWatchedId
      }}
    >
      {children}
    </WatchedContext.Provider>
  );
};

//custom hook
export const watchedContext = () => useContext(WatchedContext);
