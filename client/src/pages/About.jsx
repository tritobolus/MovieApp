import React from "react";

const About = () => {
  return (
    <>
      <div className="mt-20 px-6 md:px-16 lg:px-32 text-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center"> About This Project</h1>

        <p className="mb-4 text-lg">
          Welcome to <span className="font-semibold">My Movie Dashboard</span> — 
          a full-stack web application designed to manage, explore, and track your favorite movies.
          This project combines the power of <span className="font-semibold">React</span> for the frontend,
          <span className="font-semibold"> Node.js + Express</span> for the backend, and 
          <span className="font-semibold"> MySQL</span> for data storage.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3"> Key Features</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Add and manage your <strong>custom movies</strong> manually.</li>
          <li>View and organize movies from the <strong>TMDB API</strong> (The Movie Database).</li>
          <li>Create and maintain <strong>Watchlist</strong> and <strong>Watched</strong> movie collections.</li>
          <li>Use the <strong>Filter</strong> popup to refine movies by <em>region</em>, <em>release year</em>, or <em>adult content</em>.</li>
          <li>Track every action you perform — like adding, deleting, or updating movies — in your <strong>Activity Log</strong>.</li>
          <li>Modern, responsive dashboard layout with a sidebar for navigation and dynamic content area.</li>
          <li>Includes <strong>About</strong> section (this one!) and more coming soon.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3"> Tech Stack</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Frontend:</strong> React, React Router DOM, Tailwind CSS, Framer Motion (for animations).</li>
          <li><strong>Backend:</strong> Node.js, Express.js.</li>
          <li><strong>Database:</strong> MySQL (without Sequelize).</li>
          <li><strong>API:</strong> TMDB API (for fetching movie data).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3"> How Activity Tracking Works</h2>
        <p className="mb-4">
          Every time you perform an action — like adding a movie, updating its details, or deleting it — 
          the system records that event in the <code>activity</code> table in the database.  
          Each record stores your <strong>user ID</strong>, the <strong>source</strong> (like TMDB or Custom),
          the <strong>action</strong> (added, deleted, updated), and the <strong>movie title</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Project Purpose</h2>
        <p className="mb-4">
          This project was built to improve full-stack development skills — connecting a dynamic React frontend
          with a robust Node.js + MySQL backend. It demonstrates working with external APIs, CRUD operations,
          authentication logic, and responsive UI design.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Future Enhancements</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>User authentication and roles (Admin, Seller, Customer).</li>
          <li>Movie rating and review system.</li>
          <li>Analytics dashboard for movie statistics.</li>
          <li>Cloud storage for movie posters.</li>
        </ul>

        <p className="mt-10 text-center text-gray-400">
          © {new Date().getFullYear()} My Movie Dashboard — Built by tritobolus
        </p>
      </div>
    </>
  );
};

export default About;
