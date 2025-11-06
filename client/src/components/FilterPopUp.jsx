import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterPopup({
  onClose,
  region,
  setRegion,
  year,
  setYear,
  primaryYear,
  setPrimaryYear,
  adult,
  setAdult,
}) {

  const [tempRegion, setTempRegion] = useState(region || "");
  const [tempYear, setTempYear] = useState(year || "");
  const [tempPrimaryYear, setTempPrimaryYear] = useState(primaryYear || "");
  const [tempAdult, setTempAdult] = useState(adult); 

  useEffect(() => {
    // Ensure the initial value for tempAdult is reset to false if not provided by the parent
    setTempRegion(region || "");
    setTempYear(year || "");
    setTempPrimaryYear(primaryYear || "");
    setTempAdult(adult !== undefined ? adult : "false");  // Ensure it's false by default if no prop is passed
  }, [region, year, primaryYear, adult]);

  const handleApply = () => {
    setRegion(tempRegion);
    setYear(tempYear);
    setPrimaryYear(tempPrimaryYear);
    setAdult(tempAdult);

    toast.success("✅ Filters applied!");

    onClose();
  };

  const handleReset = () => {
    setTempRegion("");
    setTempYear("");
    setTempPrimaryYear("");
    setTempAdult(false);  

    toast.dismiss("filter-toast");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{
            scale: 0.8,
            opacity: 0,
            y: 20,
            transition: { duration: 0.25, ease: "easeInOut" },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-gray-900 rounded-2xl shadow-2xl p-6 w-80 sm:w-96 relative text-white border border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-5 text-center text-blue-400">
            🎬 Filters
          </h2>

          {/* REGION */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-400">Region</label>
            <select
              value={tempRegion}
              onChange={(e) => setTempRegion(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">All Regions</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="JP">Japan</option>
              <option value="KR">South Korea</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>

          {/* YEAR */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-400">Release Year</label>
            <input
              type="number"
              placeholder="Ex: 2023"
              value={tempYear}
              onChange={(e) => setTempYear(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* PRIMARY RELEASE YEAR */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-400">
              Primary Release Year
            </label>
            <input
              type="number"
              placeholder="Ex: 2023"
              value={tempPrimaryYear}
              onChange={(e) => setTempPrimaryYear(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-400">Include Adult Content</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value={tempAdult}
                checked={tempAdult}
                onChange={(e) => setTempAdult(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full relative transition-all duration-300 peer-checked:bg-blue-500">
                <motion.div
                  layout
                  className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full"
                  animate={{ x: tempAdult ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </label>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-all"
            >
              Reset
            </button>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-all"
              >
                Close
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-400 transition-all"
              >
                Apply
              </button>
            </div>
          </div>

          <ToastContainer
            position="top-right"
            theme="dark"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
