import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, HeartPlus, Eye, CircleCheckBig } from "lucide-react";
import { watchlistContext } from "../context/WatchlistContext";

const Watchlist = () => {
  const { auth, checkAuth, userId } = useAuth();
  const {
    loading,
    watchlistMovie,
    setWatchlistMovieId,
    setWatchlistMovie,
    watchlistMovieId,
    getWatchlistMovies,
    getWatchlistId,
  } = watchlistContext();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const navigate = useNavigate();

  // --- ADD TO FAVORITE ---
  const handleFavorite = async (movieId, movieTitle) => {
    try {
      const res = await axios.post("http://localhost:5000/movie/favorite", {
        movieId,
        userId,
        movieTitle
      });
      if (res.status === 200) toast.success("Added to Favorites ");
    } catch (error) {
      toast.error(error.response?.data?.message || "Already in favorites!");
    }
  };
  const handleWatched = async (movieId, movieTitle) => {
    try {
      const res = await axios.post("http://localhost:5000/movie/watched", {
        movieId,
        userId,
        movieTitle
      });
      if (res.status === 200) toast.success("Added to Watched ");
    } catch (error) {
      toast.error(error.response?.data?.message || "Already in Watched!");
    }
  };

  // --- REMOVE FROM WATCHLIST ---
  const removeWatchlist = async (movieId, movieTitle) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/movie/removewatchlist",
        { params: { userId, movieId, movieTitle } }
      );
      if (res.status === 200) {
        toast.success("Removed from Watchlist ");
        setWatchlistMovieId((prev) =>
          prev.filter((wl) => wl.movie_id !== movieId)
        );
        setWatchlistMovie((prev) =>
          prev.filter((movie) => movie.id !== movieId)
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing from watchlist!");
    }
  };

  // --- LIFECYCLE ---
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (userId) getWatchlistId();
  }, [userId]);

  useEffect(() => {
    getWatchlistMovies();
  }, [watchlistMovieId]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-full flex flex-col p-2 sm:p-4">
      {/* Fixed Title */}
      <div className="sticky top-0  pb-2">
        <h2 className="text-3xl font-semibold text-blue-400 ">
          Your Watchlist
        </h2>
        {/* <hr className="border-gray-800" /> */}
      </div>

      {/* Scrollable Movies */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          flex-1
          overflow-y-auto
          pr-2
          scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900
        "
      >
        {auth ? (
          loading ? (
            <div className="flex justify-center items-center h-40">
              <Loading position={"mt-15"} />
            </div>
          ) : watchlistMovie.length > 0 ? (
            <AnimatePresence>
              <div
                className="
                  grid gap-6
                  grid-cols-2 sm:grid-cols-2 md:grid-cols-3
                  lg:grid-cols-4 xl:grid-cols-5
                  mt-2
                  mb-4
                  p-2
                "
              >
                {watchlistMovie.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="
                      relative group rounded-2xl overflow-hidden
                      bg-gray-900/60 border border-gray-800
                      shadow-lg hover:shadow-blue-700/40
                      transition-all duration-300 hover:scale-[1.03] text-white
                    "
                  >
                    {/* Poster */}
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-[240px] sm:h-[320px] md:h-[360px] object-cover rounded-2xl group-hover:opacity-90 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-[240px] sm:h-[360px] flex items-center justify-center bg-gray-700 text-gray-400 text-sm">
                        No Image
                      </div>
                    )}

                    {/* Title Overlay */}
                    <div
                      className="
                        absolute top-0 left-0 w-full bg-gray-950/80 backdrop-blur-md
                        px-3 py-1 sm:opacity-0 sm:group-hover:opacity-100
                        sm:translate-y-[-10px] sm:group-hover:translate-y-0
                        sm:transition-all sm:duration-300
                      "
                    >
                      <h2
                        className="font-bold italic text-xs sm:text-base text-blue-400 truncate"
                        style={{ textShadow: "0 0 8px rgba(0,0,0,0.9)" }}
                      >
                        {movie.title.length > (isMobile ? 10 : 18)
                          ? `${movie.title.substring(0, isMobile ? 10 : 18)}...`
                          : movie.title}
                      </h2>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-1 right-2 bg-blue-600 text-xs font-semibold px-1 py-0 sm:px-2 sm:py-1 rounded-full shadow-md">
                      ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                    </div>

                    {/* Buttons */}
                    <div
                      className="
                        absolute bottom-0 left-0 w-full flex justify-around items-center py-1
                        bg-gray-950/70 backdrop-blur-md
                        sm:opacity-0 sm:group-hover:opacity-100
                        sm:translate-y-3 sm:group-hover:translate-y-0
                        sm:transition-all sm:duration-300
                      "
                    >
                      <Trash2
                        onClick={() => removeWatchlist(movie.id, movie.title)}
                        className="text-red-500 hover:text-red-400 cursor-pointer transition-all"
                        size={isMobile ? 18 : 22}
                      />
                      <HeartPlus
                        onClick={() => handleFavorite(movie.id, movie.title)}
                        className="text-blue-400 hover:text-blue-300 cursor-pointer transition-all"
                        size={isMobile ? 18 : 22}
                      />
                      <CircleCheckBig
                        onClick={() => handleWatched(movie.id, movie.title)}
                        className="text-teal-500 hover:text-teal-600 cursor-pointer transition-all"
                        size={isMobile ? 18 : 22}
                      />
                      <Eye
                        onClick={() => navigate(`/movie/${movie.id}`)}
                        className="text-green-400 hover:text-green-300 cursor-pointer transition-all"
                        size={isMobile ? 18 : 22}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <div className="text-center text-gray-400 mt-20 text-lg">
              No movies in your watchlist yet 🎬 <br />
              <span className="text-gray-500 text-sm">
                Add some movies to start building your list.
              </span>
            </div>
          )
        ) : (
          <div className="mt-10 flex flex-col justify-center items-center">
            <p className="text-gray-300">You are not Authenticated!</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-red-500 text-white py-2 px-3 rounded-xl mt-3 hover:scale-105 hover:bg-red-600 transition-all duration-150"
            >
              Login Now
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Watchlist;
