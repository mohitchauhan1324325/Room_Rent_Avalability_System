import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FavoriteLists = ({ favorite }) => {
  const navigate = useNavigate();

  if (!favorite || favorite.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-24 px-4 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No favorites yet</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Explore our listings and save the ones you love.</p>
          <button 
            onClick={() => navigate("/rooms")}
            className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-2 rounded-xl transition shadow-lg shadow-brand-500/30 hover:-translate-y-0.5"
          >
            Explore Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Favorite Rooms
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Your curated list of properties.</p>
        </motion.div>

        {/* Favorite List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorite.map((room, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              key={room?._id}
              onClick={() => {
                // If the room object is fully populated, we could navigate
                if (room?.room) navigate("/rooms");
              }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200/60 dark:border-gray-700/60 transition-all duration-300 group cursor-pointer"
            >
              <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                {room?.room?.images?.[0] ? (
                  <img src={room.room.images[0]} alt={room.room.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full shadow-sm text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <p className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">
                  {room?.room?.title || "Unknown Room"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                  Room ID: {room?.room?._id}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteLists;