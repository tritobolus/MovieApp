import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { MovieController } from "../components/MovieController";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { auth, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <div className="">
        <MovieController />
      </div>

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
  );
};

export default Home;
