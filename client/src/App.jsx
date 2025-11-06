import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import MovieDetails from "./pages/MovieDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

// Dashboard nested components
import Watched from "./components/Dashboard/Watched";
import Overview from "./components/Overview";
import Favorites from "./components/Favorites";
import Watchlist from "./components/Watchlist";
import CustomMovies from "./components/CustomMovies";
import Layout from "./pages/Layout";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path ="/" element={<Layout/>} >
        <Route index element={<Home />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* Dashboard with nested routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="watched" element={<Watched />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="custom" element={<CustomMovies />} />
      </Route>
    </Routes>
  );
}

export default App;
