import React from "react";

const FavoriteLists = ({ favorite }) => {
  return (
    <div className="min-h-screen px-4 py-6 md:px-8 dark:bg-gray-950">

      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Favorite Rooms
        </h1>
      </div>

      {/* Favorite List */}
      <div className="space-y-4">

        {favorite.map((room) => (
          <div
            key={room?._id}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.01] transition duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >

            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {room?.room?.title}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 break-all">
                Room ID: {room?.room?._id}
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default FavoriteLists;