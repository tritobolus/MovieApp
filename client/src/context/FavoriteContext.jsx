import { createContext, useState,useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteMovieId, setFavoriteMovieId] = useState([]);
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userId} = useAuth();

  const getFavoritesId = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/movie/getfavorites", {
        params: { userId },
      });
      setFavoriteMovieId(res.data.favorites || []);
    } catch (error) {
      console.error(error);
      setFavoriteMovieId([]);
      setFavoriteMovie([]);
    } finally {
      setLoading(false);
    }
  };

  const getFavoriteMovies = async () => {
    if (favoriteMovieId.length === 0) {
      setFavoriteMovie([]);
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
        favoriteMovieId.map(async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id.movie_id}?language=en-US`,
            options
          );
          return await res.json();
        })
      );
      setFavoriteMovie(movieDetails);
    } catch (error) {
      console.error(error);
      setFavoriteMovie([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
       favoriteMovie,
       loading,
       setFavoriteMovie,
       setFavoriteMovieId,
       favoriteMovieId,
       getFavoriteMovies,
       getFavoritesId
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

//custom hook
export const favoriteContext = () => useContext(FavoriteContext);
