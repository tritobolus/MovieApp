import React, { useState } from "react";
import { Menu, X, LogOut, LogIn, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNav } from "../context/NavState";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

  const NavBar = () => {
  const { auth, name } = useAuth();
  const {
    home,
    setHome,
    favorite,
    setFavorite,
    watchlist,
    setWatchlist,
    about,
    setAbout,
    dashboard,
    setDashboard,
  } = useNav();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleHome = () => {
    setHome(true);
    setFavorite(false);
    setWatchlist(false);
    setAbout(false);
    setDashboard(false);
    setMenuOpen(false);
  };
  const handleWatchlist = () => {
    setWatchlist(true);
    setHome(false);
    setFavorite(false);
    setAbout(false);
    setDashboard(false);
    setMenuOpen(false);
  };
  const handlefavorite = () => {
    setFavorite(true);
    setHome(false);
    setWatchlist(false);
    setAbout(false);
    setDashboard(false);
    setMenuOpen(false);
  };
  const handleAbout = () => {
    setAbout(true);
    setHome(false);
    setFavorite(false);
    setWatchlist(false);
    setDashboard(false);
    setMenuOpen(false);
  };
  const handleDashboard = () => {
    setDashboard(true);
    setAbout(false);
    setHome(false);
    setFavorite(false);
    setWatchlist(false);
    setMenuOpen(false);
  };

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      if (res.data.status === "Success") {
        toast.success("Logging out...");
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  };

  return (
    <>
      <nav className="bg-gray-950/90 backdrop-blur-md text-white py-4 shadow-md border-b border-gray-800 fixed w-full top-0 z-100 ">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white/80 hover:text-blue-500 transition-all ml-5"
          >
            <span className="text-2xl md:text-3xl   italic  font-serif bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
              MovieFinder
            </span>
            {/* font-semibold active:scale-95 transition-all duration-200 hover:scale-105 font-serif bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent */}
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 font-medium items-center mr-20">
            <Link
              to="/"
              onClick={handleHome}
              className={`items-center justify-center transition-all duration-300 ease-in-out rounded-2xl scale-105 p-1 px-2 hover:text-blue-400 ${
                home ? "italic bg-blue-500 hover:text-white" : "bg-gray-800/70"
              }`}
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              onClick={handleDashboard}
              className={`items-center justify-center transition-colors duration-300 ease-in-out rounded-2xl scale-105 p-1 px-2 ${
                dashboard
                  ? "italic bg-blue-500 text-white"
                  : "bg-gray-800/70 text-gray-300 hover:text-blue-400"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/about"
              onClick={handleAbout}
              className={`items-center justify-center transition-colors duration-300 ease-in-out rounded-2xl scale-105 p-1 px-2 ${
                about
                  ? "italic bg-blue-500 text-white"
                  : "bg-gray-800/70 text-gray-300 hover:text-blue-400"
              }`}
            >
              About
            </Link>
          </ul>
          <div className=" md:flex">
            {auth ? (
              <>
                <div onClick={() => setMenuOpen(!menuOpen)} className=" hover:cursor-pointer relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-900 rounded-full  border-2 border-red-500 mr-5">
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {name.substring(0,1)}
                  </span>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="text-blue-500 font-bold"
              >
                <LogIn size={25} />
                
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          {/* <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none text-blue-400"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button> */}
        </div>
      </nav>

      {/* Mobile Dropdown  */}
      <div
        className={` fixed top-[65px] right-0 w-40 z-40 transition-all duration-300 ease-in-out transform origin-right ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <ul className="flex flex-col items-start text-white space-y-6 p-4 font-medium bg-gray-900/70 backdrop-blur-md border-l border-gray-800 rounded-l-2xl shadow-lg text-right">
          <Link
            to="/"
            onClick={handleHome}
            className={`hover:text-blue-400 transition-all sm:hidden ${
              home
                ? "rounded-xl scale-105 italic hover:text-white bg-blue-500 p-1 px-2 "
                : ""
            }`}
          >
            Home
          </Link>
          {/* <Link
            to="/favorites"
            onClick={handlefavorite}
            className={`hover:text-blue-400 transition-all ${
              favorite
                ? "rounded-xl scale-105 italic hover:text-white bg-blue-500 p-1 px-2"
                : ""
            }`}
          >
            Favorites
          </Link> */}
          {/* <Link
            to="/watchlist"
            onClick={handleWatchlist}
            className={`hover:text-blue-400 transition-all ${
              watchlist
                ? "rounded-xl scale-105 italic hover:text-white bg-blue-500 p-1 px-2"
                : ""
            }`}
          >
            Watchlist
          </Link> */}
          <Link
            to="/about"
            onClick={handleAbout}
            className={`hover:text-blue-400 transition-all sm:hidden ${
              about
                ? "rounded-xl scale-105 italic hover:text-white bg-blue-500 p-1 px-2 "
                : ""
            }`}
          >
            About
          </Link>

          {auth ? (
            <>
              <Link
                to="/dashboard"
                onClick={handleDashboard}
                className={`hover:text-blue-400 transition-all sm:hidden ${
              dashboard
                ? "rounded-xl scale-105 italic hover:text-white bg-blue-500 p-1 px-2 "
                : ""
            }`}
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 transition-all w-24 text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700 transition-all w-24 text-center"
            >
              Login
            </Link>
          )}
        </ul>
      </div>

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
  );
};

export default NavBar;
