import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const { auth, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  // 🧠 Show loading state before auth is determined
  if (auth === null) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-300">
        Checking authentication...
      </div>
    );
  }

  return (
    
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar/>
      </div>
      
      {auth ? (
        <div className="flex flex-1 pt-16 relative">
          <Sidebar />
          <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 h-[calc(100vh-64px)] p-4 mt-5 sm:mt-0 sm:p-8 md:ml-64"
          >
            <Outlet />
          </motion.main>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen gap-4 text-center">
          <p className="text-lg">You are not logged in</p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 font-semibold bg-red-500 rounded-2xl hover:scale-105 transition"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
