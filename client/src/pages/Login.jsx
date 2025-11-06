import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";


const Login = () => {
    const {name} = useAuth()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", formData);
      console.log(res)
      if (res.status === 200) {
        toast.success(`${name}`+res.data.message);
        setTimeout(() => navigate("/"), 2000)
      }
    } catch (error) {
        console.log(error)
    //   toast.error(error.response.data.message)
            if (error.response) {
            // Server responded with an error
            toast.error(error.response.data.message);
        } else {
            // Network or other error
            toast.error("An error occurred. Please try again.");
        }

    }
  };

  return (
   <>
     <div className="min-h-screen flex px-5 items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-400 flex justify-center items-center gap-2">
            <LogIn size={28} /> Login
          </h1>
          <p className="text-gray-400 mt-2">
            Welcome back! Log in to continue exploring
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
          >
            Register →
          </span>
        </p>
      </motion.div>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
   </>
  );
};

export default Login;
