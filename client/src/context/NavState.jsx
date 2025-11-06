import { createContext, useContext, useState } from "react";

export const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [home, setHome] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [watchlist, setWatchlist] = useState(false);
  const [about, setAbout] = useState(false);
  const [dashboard, setDashboard] = useState(false);

  return (
    <NavContext.Provider
      value={{
       home,
       setHome,
       favorite,
       setFavorite,
       watchlist,
       setWatchlist,
       about,
       setAbout,
       dashboard,
       setDashboard
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

//custom hook
export const useNav = () => useContext(NavContext);
