import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [home, setHome] = useState(false);
  const [about, setAbout] = useState(false);
  const [dashboard, setDashboard] = useState(false);

  const location = useLocation()

  
  useEffect(() => {
    const path = location.pathname;
    if(path == "/" ) {
      setHome(true)
      setDashboard(false)
      setAbout(false)
    }
    if(path == "/about" ) {
      setAbout(true)
      setHome(false)
      setDashboard(false)
    }
    if(path == "/dashboard" || path == "/dashboard/custom" || path == "/dashboard/favorites" || path == "/dashboard/watchlist" || path == "/dashboard/watched" ) {
      setDashboard(true)
      setHome(false)
      setAbout(false)
    }

  }, [location])

  return (
    <NavContext.Provider
      value={{
       home,
       about,
       dashboard,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

//custom hook
export const useNav = () => useContext(NavContext);
