import { createContext, useState,useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlistMovieId, setWatchlistMovieId] = useState([]);
  const [watchlistMovie, setWatchlistMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userId} = useAuth();

  // --- FETCH WATCHLIST IDs ---
  const getWatchlistId = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/movie/getwatchlist", {
        params: { userId },
      });
      setWatchlistMovieId(res.data.watchlist || []);
    } catch (error) {
      console.error(error);
      setWatchlistMovieId([]);
      setWatchlistMovie([]);
    } finally {
      setLoading(false);
    }
  };

  // --- FETCH MOVIE DETAILS ---
  const getWatchlistMovies = async () => {
    if (watchlistMovieId.length === 0) {
      setWatchlistMovie([]);
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
        watchlistMovieId.map(async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id.movie_id}?language=en-US`,
            options
          );
          return await res.json();
        })
      );
      setWatchlistMovie(movieDetails);
    } catch (error) {
      console.error(error);
      setWatchlistMovie([]);
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
    <WatchlistContext.Provider
      value={{
       watchlistMovie,
       loading,
       setWatchlistMovieId,
       setWatchlistMovie,
       watchlistMovieId,
       getWatchlistMovies,
       getWatchlistId
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

//custom hook
export const watchlistContext = () => useContext(WatchlistContext);
