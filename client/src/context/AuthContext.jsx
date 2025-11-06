import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/verification", {
          withCredentials: true,
        });
        // console.log(res);
        if (res.data.status === "Success") {
          setAuth(true);
          setName(res.data.name);
          setEmail(res.data.email)
          setUserId(res.data.userId)
        }
      } catch (error) {
        console.log(error);
        setAuth(false);
        setMessage(error.response?.data?.Error || "Authentication failed");
      }
    };
    
  return (
    <AuthContext.Provider
      value={{
        auth,
        message,
        name,
        email,
        userId,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
export const useAuth = () => useContext(AuthContext)
