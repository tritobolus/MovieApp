import { createContext, useState, useEffect } from "react";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adult, setAdult] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [region, setRegion] = useState("");
  const [year, setYear] = useState("");
  const [primaryYear, setPrimaryYear] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  // curl --request GET \
  //    --url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' \
  //    --header 'accept: application/json'
  // https://api.themoviedb.org/3/search/movie?query=avatar&language=en-US&page=1&include_adult=false&region=IN&year=2023&primary_release_year=2023
  console.log("Adult value: " +adult)
  const api1 =  `https://api.themoviedb.org/3/search/movie?query=${query}&language=${language}&page=${page}&include_adult=${adult}&region=${region}&year=${year}&primary_release_year=${primaryYear}`

  const api2 = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      // https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}
      const url = api1;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      };

      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setTotalPages(data.total_pages);
        console.log(data);

        // Sort by popularity (optional but looks better)
        const sortedMovies = (data.results || []).sort(
          (a, b) => b.popularity - a.popularity
        );

        setMovies(sortedMovies);
        // setMovies(data)
      } catch (err) {
        console.error("Error fetching:", err);
        setError("Something went wrong while fetching movies.");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if(query.length === 0) {
      setMovies([])
    }
    if (!query) return;
    setPage(1)

    // debouncing effect for fetch movies
    const timer = setTimeout(() => {
      fetchMovies();
    }, 800)

    return () => clearTimeout(timer)
  }, [query]);
  
  useEffect(() => {
    fetchMovies()
  }, [page,adult, region, year, primaryYear])

  // useEffect(() => {
  //   if(query.length === 0) {
  //     setMovies([])
  //   }
  // },[query])

  return (
    <MoviesContext.Provider
      value={{
        query,
        setQuery,
        movies,
        setMovies,
        loading,
        setLoading,
        error,
        setError,
        page,
        setPage,
        totalPages,
        language,
        setRegion,
        region,
        setAdult,
        adult,
        setYear,
        year,
        setPrimaryYear,
        primaryYear

      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
