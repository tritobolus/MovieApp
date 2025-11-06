import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../context/MoviesContext";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import { motion } from "framer-motion";
import { HeartPlus, BookmarkPlus, Eye, CircleCheckBig } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

function Movies() {
  const { query, movies, loading, error } = useContext(MoviesContext);
  const { auth, userId } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const handleFavorite = async (movieId, movieTitle) => {
    try {
      if (!auth) {
        toast.error("Please log in first!");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }
      const res = await axios.post("http://localhost:5000/movie/favorite", {
        movieId,
        movieTitle,
        userId,
      });
      if (res.status === 200) toast.success("Added to favorites ");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already in favorites!");
    }
  };


  const handleWatchlist = async (movieId, movieTitle) => {
    try {
      if (!auth) {
        toast.error("Please log in first!");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }
      const res = await axios.post("http://localhost:5000/movie/watchlist", {
        movieId,
        movieTitle,
        userId,
      });
      if (res.status === 200) toast.success("Added to watchlist ");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already in watchlist!");
    }
  };
  
  const handleWatched = async (movieId, movieTitle) => {
    try {
      if (!auth) {
        toast.error("Please log in first!");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }
      const res = await axios.post("http://localhost:5000/movie/watched", {
        movieId,
        movieTitle,
        userId,
      });
      if (res.status === 200) toast.success("Added to watched ");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already in watched!");
    }
  };

  return (
    <div className="text-white px-4 py-6">
      {query && loading ? (
        <div className="flex justify-center items-center h-40">
          <Loading />
        </div>
      ) : error ? (
        <p className="text-center text-red-400 font-medium">{error}</p>
      ) : movies.length === 0 && query ? (
        <p className="text-center text-gray-400">No movies found.</p>
      ) : (
        <div
          className="
            grid gap-9
            grid-cols-2 
            sm:grid-cols-2
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5
          "
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.03 }}
              className="
                relative group rounded-2xl overflow-hidden 
                bg-gray-900/80 shadow-xl hover:shadow-blue-900/90 
                transition-all duration-300
              "
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="
                    w-full 
                    h-[250px] sm:h-[300px] md:h-[375px]
                    object-cover object-center
                    rounded-2xl
                    group-hover:opacity-90 transition-all duration-300
                  "
                />
              ) : (
                <div className="w-full h-[250px] sm:h-[375px] flex items-center justify-center bg-gray-700 text-gray-400 text-sm">
                  No Image
                </div>
              )}

              <div
                className="
                absolute top-0 left-0 w-full 
              bg-gray-950/70 backdrop-blur-md px-2 py-1
              sm:opacity-0 sm:group-hover:opacity-100
              flex items-center justify-between
              sm:transition-all sm:duration-300
              sm:-translate-y-3 sm:group-hover:translate-y-0
  "
              >
                <h2
                  className="font-bold text-xs sm:text-base text-blue-400 truncate"
                  style={{ textShadow: "0 0 8px rgba(0,0,0,0.9)" }}
                >
                  {movie.title.length > (window.innerWidth < 640 ? 10 : 15)
                    ? `${movie.title.substring(0, isMobile ? 10 : 15)}...`
                    : movie.title}
                </h2>
              </div>
              <div className="absolute top-1 right-2  bg-blue-600 text-xs font-semibold px-1 py-0 sm:px-2 sm:py-1 rounded-full shadow-md">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </div>

              <div
                className="
                  absolute bottom-0 left-0 w-full flex justify-around items-center py-1
                  bg-gray-950/70 backdrop-blur-md
                  sm:opacity-0 sm:group-hover:opacity-100 
                  sm:translate-y-3 sm:group-hover:translate-y-0
                  sm:transition-all sm:duration-300
                "
              >
                <HeartPlus
                  onClick={() => handleFavorite(movie.id, movie.title)}
                  className="text-red-500 hover:text-red-700 hover:scale-110 shadow-xl active:scale-90  cursor-pointer transition-all"
                  size={isMobile ? 18 : 22}
                />
                <BookmarkPlus
                  onClick={() => handleWatchlist(movie.id, movie.title)}
                  className="text-blue-600 hover:text-blue-800 shadow-xl hover:scale-110 active:scale-90  cursor-pointer transition-all"
                  size={isMobile ? 18 : 22}
                />
                <CircleCheckBig
                  onClick={() => handleWatched(movie.id, movie.title)}
                  className="text-teal-500 hover:text-teal-600 shadow-xl hover:scale-110 active:scale-90  cursor-pointer transition-all"
                  size={isMobile ? 18 : 22}
                />
                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="text-green-400 hover:text-green-600 shadow-xl hover:scale-110 active:scale-90 transition-all"
                >
                  <Eye size={isMobile ? 18 : 22} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;
