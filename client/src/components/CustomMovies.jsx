import { useEffect, useState } from "react";
import AddCustomMovieForm from "./Dashboard/AddCustomeMovieForm";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Eye, PenLine } from "lucide-react";

export default function CustomMovies() {
  const [addMovie, setAddMovie] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [movieToEdit, setMovieToEdit] = useState(null);

  const { userId } = useAuth();

  const getCustomMovies = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/customMovie/get",
        {
          withCredentials: true,
        }
      );
      setMovies(response.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load movies!");
    } finally {
      setLoading(false);
    }
  };

  const removeMovie = async (movieId, movieTitle) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/customMovie/remove",
        {
          withCredentials: true,
          params: { movieId, movieTitle },
        }
      );
      if (res.status === 200) {
        toast.success("Movie removed!");
        setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
      }
    } catch (error) {
      console.log(error);
      toast.error("Error removing movie!");
    }
  };

  const handleEdit = () => {};

  useEffect(() => {
    getCustomMovies();
  }, [userId]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-full flex flex-col p-2 sm:p-4">
      <div className="sticky top-0 z-20 bg-gray-950/80 backdrop-blur-md pb-2 flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-blue-400">
          Custom Movies
        </h2>
        <button
          onClick={() => setAddMovie((prev) => !prev)}
          className="px-2.5 py-1.5 shadow-blue-500 shadow-md bg-gray-800/70 rounded-2xl font-semibold active:scale-95 transition-all duration-200 hover:scale-105 font-serif bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
        >
          {addMovie ? "Close" : "Add Movie"}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {loading ? (
          <div className="flex justify-center items-center h-40 text-gray-400">
            Loading...
          </div>
        ) : movies.length > 0 ? (
          <AnimatePresence>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-2 mt-2 mb-4">
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group rounded-2xl overflow-hidden bg-gray-900/60 border border-gray-800 shadow-lg hover:shadow-blue-700/40 transition-all duration-300 hover:scale-[1.03]  text-white"
                >
                  <div className="absolute z-10 top-0 sm:top-1 right-2 px-1 sm:px-2 py-0 sm:py-0.5 text-sm rounded-2xl font-semibold bg-blue-500">
                    ⭐ {movie.rating}
                  </div>
                  {/* Poster */}
                  {movie.image_url ? (
                    <img
                      src={movie.image_url}
                      alt={movie.title}
                      className="w-full h-[240px] sm:h-[320px] md:h-[360px] object-cover rounded-2xl group-hover:opacity-90 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full h-[240px] sm:h-[320px] md:h-[360px] flex items-center justify-center bg-gray-700 text-gray-400 text-sm">
                      No Image
                    </div>
                  )}

                
                  <div className="absolute top-0 left-0 w-full bg-gray-950/80 backdrop-blur-md px-3 py-1 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-[-10px] sm:group-hover:translate-y-0 sm:transition-all sm:duration-300">
                    <h2
                      className="font-bold italic text-xs sm:text-base text-blue-400 truncate"
                      style={{ textShadow: "0 0 8px rgba(0,0,0,0.9)" }}
                    >
                      {movie.title.length > (isMobile ? 10 : 18)
                        ? `${movie.title.substring(0, isMobile ? 10 : 18)}...`
                        : movie.title}
                    </h2>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full flex justify-around items-center py-1 bg-gray-950/70 backdrop-blur-md sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-3 sm:group-hover:translate-y-0 sm:transition-all sm:duration-300">
                    <Trash2
                      onClick={() => removeMovie(movie.id, movie.title)}
                      className="text-red-500 hover:text-red-400 cursor-pointer transition-all"
                      size={isMobile ? 18 : 22}
                    />
                    <div className="font-semibold text-sm text-gray-500 italic">
                      {movie.release_date.substring(0, 10)}
                    </div>
                    <PenLine
                      onClick={() => {
                        setMovieToEdit(movie);
                        setAddMovie(true);
                      }}
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
            No custom movies yet
            <br />
            <span className="text-gray-500 text-sm">
              Add your own movies using the button above.
            </span>
          </div>
        )}
      </motion.div>

      {addMovie && (
        <AddCustomMovieForm
          onClose={() => {
            setAddMovie(false);
            setMovieToEdit(null);
          }}
          refresh={() => getCustomMovies()}
          movieToEdit={movieToEdit}
        />
      )}

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
}
