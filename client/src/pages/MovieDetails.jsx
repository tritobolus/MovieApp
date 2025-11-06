import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import { Star, Clock, Calendar, Globe, Film, Home } from "lucide-react";
import { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";

const MovieDetails = () => {
  const { language } = useContext(MoviesContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=${language}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      };

      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loading />
      </div>
    );

  if (!movie)
    return (
      <p className="text-center text-gray-400 min-h-screen flex justify-center items-center">
        Movie not found.
      </p>
    );

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 🔥 Backdrop Background */}
      {movie.backdrop_path && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-[5px] brightness-[0.5] scale-105"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        ></div>
      )}

      {/* 🖤 Dark Overlay (extra contrast) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90"></div>

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
          {/* Poster Image */}
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className="w-full md:w-1/3 max-h-[550px] object-cover rounded-2xl shadow-2xl"
          />

          {/* Movie Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 space-y-5 overflow-y-auto max-h-[80vh] pr-2 scrollbar-thin"
          >
            <div>
              <h1 className="text-4xl font-bold text-blue-400">{movie.title}</h1>
              {movie.tagline && (
                <p className="italic text-gray-400 mt-1">“{movie.tagline}”</p>
              )}
            </div>

            {/* Overview */}
            {movie.overview ? (
              <p className="text-gray-200 text-lg leading-relaxed bg-black/30 p-4 rounded-xl backdrop-blur-sm">
                {movie.overview}
              </p>
            ) : (
              <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl text-gray-400 italic">
                No overview available for this movie yet.
              </div>
            )}

            {/* Details */}
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center gap-2">
                <Calendar className="text-blue-400" size={18} />
                <span className="font-semibold text-white">Release Date:</span>{" "}
                {movie.release_date || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="text-blue-400" size={18} />
                <span className="font-semibold text-white">Runtime:</span>{" "}
                {movie.runtime ? `${movie.runtime} mins` : "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Star className="text-yellow-400" size={18} />
                <span className="font-semibold text-white">Rating:</span>{" "}
                {movie.vote_average
                  ? `${movie.vote_average.toFixed(1)} / 10`
                  : "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Film className="text-blue-400" size={18} />
                <span className="font-semibold text-white">Genres:</span>{" "}
                {movie.genres?.length
                  ? movie.genres.map((g) => g.name).join(", ")
                  : "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Globe className="text-blue-400" size={18} />
                <span className="font-semibold text-white">
                  Production Countries:
                </span>{" "}
                {movie.production_countries?.length
                  ? movie.production_countries.map((c) => c.name).join(", ")
                  : "N/A"}
              </p>
              {movie.budget > 0 && (
                <p>
                  <span className="font-semibold text-white">Budget:</span> $
                  {movie.budget.toLocaleString()}
                </p>
              )}
              {movie.revenue > 0 && (
                <p>
                  <span className="font-semibold text-white">Revenue:</span> $
                  {movie.revenue.toLocaleString()}
                </p>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-6">
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
                >
                  <Home size={18} /> Official Site
                </a>
              )}
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
              >
                View on TMDB →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
