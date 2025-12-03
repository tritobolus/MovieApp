import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0B0F19] text-gray-300 mt-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3">

        <div className="flex items-center justify-between text-sm">

          {/* Left - Brand */}
          <span className="text-blue-400 font-semibold">
            MovieFinder
          </span>

          {/* Right - Social Icons */}
          <div className="flex items-center space-x-4">

            {/* GitHub */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M12 .297a12 12 0 0 0-3.79 23.4c.6.113.82-.258.82-.577v-2.17c-3.34.726-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.76c-1.1-.75.087-.735.087-.735a2.52 2.52 0 0 1 1.84 1.24 2.57 2.57 0 0 0 3.51 1 2.57 2.57 0 0 1 .76-1.61c-2.67-.3-5.47-1.34-5.47-5.95a4.66 4.66 0 0 1 1.24-3.23 4.3 4.3 0 0 1 .12-3.18s1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.28-1.55 3.28-1.23 3.28-1.23a4.3 4.3 0 0 1 .12 3.18 4.66 4.66 0 0 1 1.24 3.23c0 4.63-2.8 5.65-5.48 5.95a2.86 2.86 0 0 1 .82 2.22v3.29c0 .32.2.7.82.58A12 12 0 0 0 12 .297"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.1 1 2.5 1s2.48 1 2.48 2.5zM.5 8h4v14h-4zm7.5 0h3.8v1.9h.05c.53-1 1.84-2.1 3.8-2.1 4.06 0 4.8 2.7 4.8 6.3V22h-4v-5.9c0-1.4 0-3.3-2-3.3-2 0-2.3 1.5-2.3 3.2V22h-4z"/>
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
