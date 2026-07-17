import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import useFavoriteRooms from "../hooks/useFavoriteRooms";
import { motion } from "framer-motion";

const RoomCard = ({
  rooms,
  handleDelete,
  handleEdit,
  handleDetails,
}) => {
  const { addToFavorite } = useFavoriteRooms();
  const navigate = useNavigate();
  const role = getUserRole();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
      {rooms.map((room, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          key={room._id}
          className="group cursor-pointer flex flex-col"
          onClick={() => handleDetails(room._id)}
        >
          {/* IMAGE CONTAINER */}
          <div className="relative w-full aspect-square overflow-hidden rounded-2xl mb-3 border border-gray-200/70 dark:border-gray-700/80 bg-gray-100 dark:bg-gray-800/70">
            <img
              src={room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* GRADIENT OVERLAY FOR TEXT READABILITY (Optional) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* FAVORITE BUTTON */}
            {role === "user" && (
              <button
                type="button"
                className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors z-10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToFavorite(room._id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-red-500 drop-shadow-md"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </button>
            )}

            {/* STATUS BADGE */}
            {!room.isAvailable && (
              <div className="absolute top-3 left-3 px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-lg shadow-sm">
                Booked
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col flex-1 rounded-2xl border border-gray-200/70 dark:border-gray-700/80 bg-white/90 dark:bg-gray-800/90 p-4 shadow-sm transition-all duration-300 group-hover:shadow-md">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-[17px] text-gray-900 dark:text-white line-clamp-1 leading-snug">
                {room.title}
              </h3>
              <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                5.0
              </div>
            </div>

            <p className="text-[15px] text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">
              {room.description || "No description available"}
            </p>

            <div className="mt-auto pt-2 flex items-center justify-between">
              <div>
                <span className="font-bold text-[17px] text-gray-900 dark:text-white">₹{room.price}</span>
                <span className="text-[15px] text-gray-500 dark:text-gray-400 font-normal"> / month</span>
              </div>

              {/* ACTION BUTTON (Visible on hover for Desktop) */}
              {room.isAvailable && role === "user" && (
                <button
                  className="opacity-100 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-lg font-medium text-sm shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/booking", { state: room });
                  }}
                >
                  Reserve
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RoomCard;