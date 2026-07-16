import { useNavigate } from "react-router-dom";
import { Plus, CalendarDays, Trash2, Home, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import RoomsFilter from "../components/RoomsFilter.jsx";
import EmptyState from "../components/EmptyState.jsx";
import RoomCard from "../components/RoomCard.jsx";
import Loader from "../components/Loader.jsx";

import useRooms from "../hooks/useRooms.js";
import { getUserRole } from "../utils/auth.js";

const RoomsPage = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  const {
    filteredRooms,
    setFilter,
    handleDeleteAllRooms,
    handleDetails,
    loading,
    error,
  } = useRooms();

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-5">
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl text-red-600 font-semibold border border-red-100 dark:border-red-900/30">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">Available Rooms</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Discover spaces that match your lifestyle. Whether it's a cozy apartment or a luxury villa, your perfect home awaits.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3"
          >
            {(role === "owner" || role === "admin") && (
              <button
                onClick={() => navigate("/AddRooms")}
                className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-500/30 hover:-translate-y-0.5 transition-all"
              >
                <Plus size={18} />
                Add Listing
              </button>
            )}

            {role === "user" && (
              <button
                onClick={() => navigate("/UserBooking")}
                className="flex items-center gap-2 rounded-xl bg-white/90 dark:bg-gray-800/90 px-5 py-3 font-medium text-gray-700 dark:text-gray-200 shadow-sm border border-gray-200/80 dark:border-gray-700/80 hover:-translate-y-0.5 transition-all"
              >
                <CalendarDays size={18} className="text-brand-500" />
                My Bookings
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={handleDeleteAllRooms}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-red-50/90 dark:bg-red-900/20 px-5 py-3 font-medium text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors disabled:opacity-50"
              >
                <Trash2 size={18} />
                {loading ? "Deleting..." : "Delete All"}
              </button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Filter and Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between bg-white/90 dark:bg-gray-800/90 p-2 sm:p-3 rounded-3xl shadow-sm border border-gray-200/70 dark:border-gray-700/80 mb-8"
        >
          <RoomsFilter setFilter={setFilter} />
          
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100/90 dark:bg-gray-900/80 rounded-2xl mr-2 border border-gray-200/60 dark:border-gray-700/60">
            <Home size={18} className="text-brand-500" />
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredRooms.length}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">results found</span>
          </div>
        </motion.div>

        {filteredRooms.length === 0 ? (
          <EmptyState />
        ) : (
          <RoomCard
            rooms={filteredRooms}
            handleDetails={handleDetails}
          />
        )}
      </div>
    </div>
  );
};

export default RoomsPage;
