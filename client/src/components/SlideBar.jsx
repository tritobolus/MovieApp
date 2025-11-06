import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slidebar.css";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const SlideBar = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        
        setLoading(false)
        setMovies((data.results || []).filter((m) => m && m.poster_path));
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  // Ensure autoplay starts when movies are ready
  useEffect(() => {
    const s = swiperRef.current;
    if (!s) return;
    const t = setTimeout(() => {
      try {
        s.update();
        s.autoplay?.start();
      } catch (err) {
        console.warn("Swiper autoplay start failed", err);
      }
    }, 150);
    return () => clearTimeout(t);
  }, [movies]);

  return (
    <div className="w-full py-5 px-6">
      {/* 🎞️ Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 text-center"
      >
        Popular Movies
      </motion.h2>

      {/* 🎬 Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        centeredSlides
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={movies.length > 5} // ✅ dynamically enable loop only if enough slides
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
        className="custom-swiper"
        onSwiper={(s) => {
          swiperRef.current = s;
          setTimeout(() => {
            try {
              s.autoplay?.start();
            } catch {}
          }, 120);
        }}
      >
        { loading ? <Loading position={"mt-10"}/> : movies.map((movie, index) => (
          <SwiperSlide key={movie.id || index}>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500">
              {/* 🎥 Movie Poster */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                // onClick={() =>{ console.log("Clicked", movie.id); navigate(`/movie/${movie.id}`)}}
                className="w-full h-[22rem]  object-cover"
              />

              {/* 🌑 Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* 🎬 Movie Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                <p className="text-sm text-gray-300">
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideBar;
