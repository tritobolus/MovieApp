import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Eye, Film, SquarePlus, ChevronsRight, Menu, X, User, CircleCheckBig } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const {name} = useAuth()

  const links = [
    { name: "Overview", path: "/dashboard", icon: <Film size={18} className="text-yellow-400" /> },
    { name: "Favorites", path: "/dashboard/favorites", icon: <Heart size={18} className="text-red-500" /> },
    { name: "Watchlist", path: "/dashboard/watchlist", icon: <Eye size={18} className="text-blue-400" /> },
    { name: "Watched", path: "/dashboard/watched", icon: <CircleCheckBig size={18} className="text-teal-500" /> },
    { name: "Custom Movies", path: "/dashboard/custom", icon: <SquarePlus size={18} className="text-blue-400" /> },
  ];

  return (
    <>
      {/* 📱 Mobile Menu Button (only visible on small screens) */}
      <div className="sm:hidden fixed top-17 left-0 z-[50] ">
        <button
          onClick={() => setOpen(!open)}
          className=" px-2 scale-105 border-blue-500  focus:outline-none active:scale-95 transition-all font-bold text-pink-600"
        >
          {open ? <X size={22} /> : <ChevronsRight size={30} />}
        </button>
      </div>

      {/* Desktop  */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col w-64 bg-black border-r border-gray-800 backdrop-blur-xl py-10 px-4 shadow-lg fixed top-16 left-0 h-[calc(100vh-64px)] z-40"
      >
        {/* <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-400 tracking-wide">
            MovieFinder
          </h1>
        </div> */}

        <div className="flex flex-col items-center gap-4 text-sm rounded-xl  p-3">
          <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-md">
            <User size={32} className="text-blue-400" />
          </div>
          <h2 className="text-lg font-medium text-blue-300 italic">Hey, {name.split(" ",1)}!</h2>
        </div>

        <div className="mt-10 w-full">
          <p className="uppercase text-gray-500 text-xs px-3 mb-3">Dashboard Links</p>
          <ul className="flex flex-col gap-2 text-gray-300">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800/60 transition-all duration-300 ${
                  location.pathname === link.path ? "bg-gray-800/60" : ""
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
      </motion.aside>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60  z-[50]"
              onClick={() => setOpen(false)}
            ></motion.div>

            <motion.div
              key="mobile-sidebar"
              initial={{ x: -250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -250, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-black z-[60] flex flex-col p-6 shadow-2xl sm:hidden"
            >

              {/* <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-blue-400 tracking-wide">
                  MovieFinder
                </h1>
              </div> */}

              <div className="flex flex-col items-center gap-4 text-sm rounded-xl  p-3 mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-md">
                  <User size={32} className="text-blue-400" />
                </div>
              <h2 className="text-lg font-medium italic text-blue-300">Hey, {name.split(" ",1)}!</h2>
              </div>

              <ul className="flex flex-col gap-2 text-gray-300">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800/60 transition-all duration-300 ${
                      location.pathname === link.path ? "bg-gray-800/60" : ""
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
