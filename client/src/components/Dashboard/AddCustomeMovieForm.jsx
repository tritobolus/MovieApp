import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function AddCustomMovieForm({ onClose, refresh, movieToEdit }) {
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    releaseDate: "",
    rating: "",
  });

  useEffect(() => {
    if (movieToEdit) {
      setFormData({
        title: movieToEdit.title || "",
        imageUrl: movieToEdit.image_url || "",
        releaseDate: movieToEdit.release_date?.substring(0, 10) || "",
        rating: movieToEdit.rating || "",
      });
    }
  }, [movieToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSave = async () => {
    try {
      if (movieToEdit) {
        // update existing movie
        const res = await axios.put(
          "http://localhost:5000/customMovie/update",
          { userId, formData , movieId:movieToEdit.id },
        );
        if (res.status === 200) toast.success("Movie updated successfully!");
      } else {
        //add new movie
        const res = await axios.post("http://localhost:5000/customMovie/save", { userId, formData });
        if (res.status === 200) toast.success("Movie added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      onClose();
      refresh();
    }
  };

  return (
    <div className="absolute z-50 top-16 left-1/2 -translate-x-1/2 w-80 sm:w-96 p-4 bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg shadow-blue-500 transition-all duration-200">
      <h1 className="flex justify-center text-2xl font-serif bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent mb-4">
        {movieToEdit ? "Edit Movie" : "Add Custom Movie"}
      </h1>

      <div className="p-2 flex flex-col space-y-3">
        
        <div className="space-y-1">
          <p className="ml-2 text-xl font-mono">Title</p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Type the title"
            className="w-full border-2 border-blue-500/40 rounded-2xl px-3 py-2 bg-gray-900/60 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
        </div>

        
        <div className="space-y-1">
          <p className="ml-2 text-xl font-mono">Image URL</p>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Paste image URL"
            className="w-full border-2 border-blue-500/40 rounded-2xl px-3 py-2 bg-gray-900/60 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
        </div>

        
        <div className="space-y-1">
          <p className="ml-2 text-xl font-mono">Release Date</p>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full border-2 border-blue-500/40 rounded-2xl px-3 py-2 bg-gray-900/60 text-white focus:outline-none focus:border-blue-400 [color-scheme:dark]"
          />
        </div>

        
        <div className="space-y-1">
          <p className="ml-2 text-xl font-mono">Rating</p>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border-2 border-blue-500/40 rounded-2xl px-3 py-2 bg-gray-900/60 text-white focus:outline-none focus:border-blue-400 appearance-none"
          >
            <option value="">Select Rating</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-4 p-2">
        <button
          onClick={handleSave}
          className="px-3 py-1 shadow-blue-500 shadow-md bg-gray-900/70 rounded-2xl active:scale-95 transition-all duration-200 hover:scale-105 font-serif bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
        >
          {movieToEdit ? "Update" : "Save"}
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1 shadow-blue-500 shadow-md bg-gray-900/70 rounded-2xl active:scale-95 transition-all duration-200 hover:scale-105 font-serif bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
        >
          Close
        </button>
      </div>
    </div>
  );
}
