import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AllActivity = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/movie/allActivity", {
          withCredentials: true,
        });
        setActivities(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchActivities();
  }, []);

  const getActionColor = (action) => {
    switch (action) {
      case "added":
        return "bg-green-700/30 text-green-300";
      case "updated":
        return "bg-yellow-700/30 text-yellow-300";
      case "removed":
      case "deleted":
        return "bg-red-700/30 text-red-300";
      default:
        return "bg-gray-700/20 text-white";
    }
  };

  const getActionLabel = (action) => {
    switch (action) {
      case "added":
        return "Added";
      case "updated":
        return "Updated";
      case "removed":
      case "deleted":
        return "Removed";
      default:
        return action;
    }
  };

  const getSourceLabel = (source) => {
    return source.charAt(0).toUpperCase() + source.slice(1).replace("_", " ");
  };

  return (
<div className="p-4 ">
  <div className="flex justify-between">
    <h2 className="text-3xl font-semibold text-blue-400 mb-6">All Activities</h2>
   <button
  onClick={() => navigate(-1)}
  className="h-8 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-150"
>
  Back
</button>
  </div>
  {activities.length === 0 ? (
    <p className="text-gray-400">No activities found.</p>
  ) : (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="hidden sm:grid grid-cols-5 bg-gray-800 text-white px-4 py-2 font-semibold sticky top-0 z-10">
        <div>#</div>
        <div>Action</div>
        <div>Movie</div>
        <div>Source</div>
        <div>Date</div>
      </div>

      {/* Table Body - Scrollable */}
      <div className="overflow-y-auto scrollbar-thin 
                      max-h-[600px] sm:max-h-[400px] p-2">
        {activities.map((act, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 sm:grid-cols-5 px-4 py-2 mb-1 border-b border-gray-700 transition-colors ${getActionColor(
              act.action
            )}`}
          >
            {/* Mobile Layout */}
            <div className="sm:hidden mb-1">
              <span className="font-semibold">#{index + 1}</span>
            </div>
            <div className="sm:hidden mb-1">
              <span className="font-semibold">Action:</span> {getActionLabel(act.action)}
            </div>
            <div className="sm:hidden mb-1">
              <span className="font-semibold">Movie:</span>{" "}
              <span
                className="text-blue-400 italic cursor-pointer hover:underline"
                onClick={() => navigate(`/movie/${act.movie_id}`)}
              >
                {act.title || "-"}
              </span>
            </div>
            <div className="sm:hidden mb-1">
              <span className="font-semibold">Source:</span> {getSourceLabel(act.source)}
            </div>
            <div className="sm:hidden mb-1">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(act.created_at).toLocaleString()}
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block">{index + 1}</div>
            <div className="hidden sm:block">{getActionLabel(act.action)}</div>
            <div
              className="hidden sm:block text-blue-400 italic cursor-pointer hover:underline"
              onClick={() => navigate(`/movie/${act.movie_id}`)}
            >
              {act.title || "-"}
            </div>
            <div className="hidden sm:block">{getSourceLabel(act.source)}</div>
            <div className="hidden sm:block text-gray-300">
              {new Date(act.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>






  );
};
