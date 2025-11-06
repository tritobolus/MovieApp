import React, { useContext, useState } from "react";
import { MoviesContext } from "../context/MoviesContext";
import { toast, ToastContainer } from "react-toastify";
import { SlidersHorizontal } from "lucide-react";
import Movies from "./Movies";
import SlideBar from "./SlideBar";
import FilterPopup from "./FilterPopUp";

export const MovieController = () => {
  const [filterPopUp, setFilterPopUp] = useState(false);
  const {
    query,
    setQuery,
    movies,
    page,
    setPage,
    totalPages,
    setRegion,
    region,
    setAdult,
    adult,
    setYear,
    year,
    setPrimaryYear,
    primaryYear
  } = useContext(MoviesContext);

  const handlePrev = () => {
    if (totalPages === 1) return toast.warn("There is only one page!");
    if (page === 1) return toast.warn("You are at the first page!");
    setPage(page - 1);
  };

  const handleNext = () => {
    if (totalPages === 1) return toast.warn("There is only one page!");
    if (page === totalPages) return toast.warn("You are at the last page!");
    setPage(page + 1);
  };

  const Pagination = () => (
    <div className="flex justify-between items-center p-5 flex-wrap gap-3">
      <p className="text-lg sm:text-2xl text-blue-400 italic font-semibold">
        Page : {page}
      </p>
      <p className="font-semibold text-lg sm:text-2xl text-white">
        {movies.length === 1
          ? `${movies.length} result`
          : `${movies.length} results`}
      </p>
      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          className={`rounded px-3 py-1 font-semibold text-white transition-all ${
            page === 1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
        >
          PREV
        </button>
        <button
          onClick={handleNext}
          className={`rounded px-3 py-1 font-semibold text-white transition-all ${
            page === totalPages
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
        >
          NEXT
        </button>
      </div>
    </div>
  );

  return (
    <>
      <p className="mt-20  text-white/60 font-semibold text-2xl flex justify-center">
        Search Movies
      </p>
      <div className="flex justify-center px-3 sm:px-0 mt-2 gap-2">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 text-sm sm:text-base text-white bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none border border-gray-700 shadow-md placeholder-gray-500 transition-all duration-200"
        />
        <SlidersHorizontal
          onClick={() => setFilterPopUp(true)}
          className="text-blue-500 mt-1 hover:cursor-pointer hover:scale-105 hover:text-blue-400 transition-all duration-200"
          size={28}
        />
      </div>
      {filterPopUp && (
        <FilterPopup
          onClose={() => setFilterPopUp(false)}
          region={region}
          setRegion={setRegion}
          year={year}
          setYear={setYear}
          primaryYear={primaryYear}
          setPrimaryYear={setPrimaryYear}
          adult={adult}
          setAdult={setAdult}
        />
      )}

      {query && movies.length > 0 && <Pagination />}

      <Movies />

      {query && movies.length > 0 && <Pagination />}

      <div className="flex justify-center items-center mt-5 mb-5">
        <SlideBar />
      </div>

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
  );
};
