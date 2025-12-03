import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MoviesProvider } from "./context/MoviesContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NavProvider } from "./context/NavState.jsx";
import { FavoriteProvider } from "./context/FavoriteContext.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import { WatchedProvider } from "./context/WatchedContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MoviesProvider>
        <FavoriteProvider>
          <WatchlistProvider>
            <WatchedProvider>
              <BrowserRouter>
                <NavProvider>
                  <App />
                </NavProvider>
              </BrowserRouter>
            </WatchedProvider>
          </WatchlistProvider>
        </FavoriteProvider>
      </MoviesProvider>
    </AuthProvider>
  </StrictMode>
);
