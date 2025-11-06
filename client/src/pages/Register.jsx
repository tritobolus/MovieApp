import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (formData.password !== formData.confirmPassword) {
    //   toast.error("Passwords do not match!");
    //   return;
    // }

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/register",
        formData
      );
    //   const data = res.json();
      if (res.status === 201) {
        console.log(res.data.message);
        toast.success("User registered successfully!");
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  return (
   <>
     <div className="min-h-screen p-5 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/80 backdrop-blur-xl p-10 mt-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-400 flex justify-center items-center gap-2">
            <UserPlus size={28} /> Register
          </h1>
          {/* <p className="text-gray-400 mt-2">
            Create your account to start your movie journey
          </p> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

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
              placeholder="Enter password"
              required
            />
          </div>
{/* 
          <div>
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
              required
            />
          </div> */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 mt-2 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
          >
            Login →
          </span>
        </p>
      </motion.div>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
   </>
  );
};

export default Register;
