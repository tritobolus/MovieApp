import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function Overview() {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [watchedCount, setWatchedCount] = useState(0);
  const [customMovieCount, setCustomMovieCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const navigate = useNavigate();

  const fetchFav = async () => {
    try {
      const favRes = await axios.get("http://localhost:5000/movie/favorites/count", {
        withCredentials: true,
      });
      setFavoritesCount(favRes.data.count || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomMovie = async () => {
    try {
      const customMovieRes = await axios.get("http://localhost:5000/customMovie/count", {
        withCredentials: true,
      });
      setCustomMovieCount(customMovieRes.data.count || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWatched = async () => {
    try {
      const watchedRes = await axios.get("http://localhost:5000/movie/watched/count", {
        withCredentials: true,
      });
      setWatchedCount(watchedRes.data.count || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWatch = async () => {
    try {
      const watchRes = await axios.get("http://localhost:5000/movie/watchlist/count", {
        withCredentials: true,
      });
      setWatchlistCount(watchRes.data.count || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchActivity = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movie/activity", {
        withCredentials: true,
      });
      setRecentActivity(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFav();
    fetchWatch();
    fetchWatched();
    fetchCustomMovie();
    fetchActivity();
  }, []);

  const getActivityColor = (source, action) => {
    if (action === "added") {
      if (source === "favorite") return "bg-pink-900/30 border-pink-800/50";
      if (source === "watchlist") return "bg-blue-900/30 border-blue-800/50";
      if (source === "custom_movie") return "bg-green-900/30 border-green-800/50";
      if (source === "watched") return "bg-green-500/30 border-green-600/50";
    } else if (action === "updated") {
      return "bg-yellow-500/40 border-yellow-700";
    } else if (action === "removed" || action === "deleted") {
      return "bg-red-500/40 border-red-700";
    }
    return "bg-gray-700/30 border-gray-600/50";
  };

  const getActivityText = (act) => {
    const { source, action, title, movie_id } = act;
    const capitalizedSource =
      source.charAt(0).toUpperCase() + source.slice(1).replace("_", " ");

    switch (action) {
      case "added":
        return (
          <>
            Added{" "}
            <span
              onClick={() => navigate(`/movie/${movie_id}`)}
              className="text-blue-400 italic hover:underline hover:cursor-pointer"
            >
              {title}
            </span>{" "}
            to {capitalizedSource}
          </>
        );
      case "updated":
        return (
          <>
            Updated <span className="text-yellow-400 italic">{title}</span> in{" "}
            {capitalizedSource}
          </>
        );
      case "removed":
      case "deleted":
        return (
          <>
            Removed{" "}
            <span
              onClick={() => navigate(`/movie/${movie_id}`)}
              className="text-red-400 italic hover:underline hover:cursor-pointer"
            >
              {title}
            </span>{" "}
            from {capitalizedSource}
          </>
        );
      default:
        return (
          <>
            Performed <span className="italic">{action}</span> on{" "}
            {capitalizedSource}
          </>
        );
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, type: "spring" },
    }),
  };

  const activityVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <div className="p-2 sm:p-4 space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold text-blue-400"
      >
        Dashboard Overview
      </motion.h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[ 
          { title: "Favorites", count: favoritesCount, color: "text-red-400" },
          { title: "Watchlist", count: watchlistCount, color: "text-blue-400" },
          { title: "Watched", count: watchedCount, color: "text-green-400" },
          { title: "Custom M", count: customMovieCount, color: "text-purple-400" },
        ].map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/70 border border-gray-700 rounded-xl p-6 text-center shadow-md"
          >
            <h3 className="text-lg font-medium text-white">{item.title}</h3>
            <p className={`text-3xl font-bold mt-2 ${item.color}`}>
              {item.count}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/70 border border-gray-800 sm:w-full h-110 md:h-80 lg:h-85 overflow-hidden rounded-2xl p-6 shadow-lg"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-semibold text-white">Recent Activity</h3>
          <button className="text-blue-400 text-sm hover:underline">
            See All →
          </button>
        </div>

        {recentActivity.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">
            No recent activity
          </p>
        ) : (
          <ul className="space-y-4 h-[360px] md:h-[300px] lg:h-[260px] overflow-y-auto pr-2 scrollbar-thin">
            <AnimatePresence>
              {recentActivity.map((act, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={activityVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-start gap-3 p-2 m-2 rounded-xl border transition-all duration-200 hover:scale-[1.01] ${getActivityColor(
                    act.source,
                    act.action
                  )}`}
                >
                  <div className="flex-1">
                    <p className="text-white text-sm leading-snug">
                      {getActivityText(act)}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(act.created_at).toLocaleString()}
                    </p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </motion.div>
    </div>
  );
}
