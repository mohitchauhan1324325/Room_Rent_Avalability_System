import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import useFavoriteRooms from "../hooks/useFavoriteRooms.js";
import { motion } from "framer-motion";

const RoomDetails = ({
  room,
  handleDelete,
  handleEdit,
}) => {
  const navigate = useNavigate();
  const role = getUserRole();
  const { addToFavorite } = useFavoriteRooms();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 items-start">
        
        {/* LEFT COLUMN: Main Content */}
        <div className="flex-1 w-full flex flex-col gap-8">
          
          {/* TITLE & HEADER */}
          <div>
            <div className="flex justify-between items-start gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {room.title}
              </h1>
              
              {/* STATUS BADGE */}
              <div className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm whitespace-nowrap ${
                room.isAvailable 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}>
                {room.isAvailable ? "Available" : "Booked"}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <span>5.0</span>
              </div>
              <span className="underline">{room.location}</span>
            </div>
          </div>

          {/* IMAGE GALLERY */}
          <div className="w-full rounded-3xl overflow-hidden shadow-xl bg-black">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={true}
              pagination={{ clickable: true }}
              spaceBetween={0}
              slidesPerView={1}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
            >
              {room.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Room image ${index + 1}`} className="w-full h-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* VIDEO GALLERY (If any) */}
          {room.videos?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Video Tour</h2>
              <div className="w-full rounded-3xl overflow-hidden shadow-xl bg-black">
                <Swiper
                  modules={[Navigation]}
                  navigation={true}
                  spaceBetween={0}
                  slidesPerView={1}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
                >
                  {room.videos.map((video, index) => (
                    <SwiperSlide key={index}>
                      <video controls className="w-full h-full object-cover">
                        <source src={video} type="video/mp4" />
                      </video>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          <div className="py-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About this space</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
              {room.description || "No description provided by the host."}
            </p>
          </div>

          {/* OWNER/ADMIN ACTIONS */}
          {(role === "admin" || role === "owner") && (
            <div className="py-6 border-t border-gray-200 dark:border-gray-700 flex gap-4">
              <button
                onClick={(e) => { e.stopPropagation(); handleEdit(room._id); }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 px-6 py-3 rounded-xl font-bold transition shadow-sm border border-gray-200 dark:border-gray-700"
              >
                Edit Listing
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(room._id); }}
                className="bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 px-6 py-3 rounded-xl font-bold transition shadow-sm border border-red-100 dark:border-red-900/30"
              >
                Delete Listing
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <div className="w-full lg:w-[400px] lg:sticky lg:top-24 flex flex-col gap-6">
          
          {/* BOOKING/PRICE CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl p-6 rounded-3xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">₹{room.price}</span>
                <span className="text-gray-500 dark:text-gray-400 text-lg"> / night</span>
              </div>
              
              {role === "user" && (
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToFavorite(room._id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </button>
              )}
            </div>

            {room.isAvailable ? (
              <button
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-brand-500/30 transition-transform transform hover:-translate-y-0.5 active:translate-y-0"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/booking", { state: room });
                }}
              >
                Reserve Now
              </button>
            ) : (
              <button disabled className="w-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold text-lg py-4 rounded-xl cursor-not-allowed">
                Currently Booked
              </button>
            )}

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              You won't be charged yet
            </div>
          </motion.div>

          {/* HOST INFO */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Hosted by</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400 text-xl font-bold uppercase">
                {room.owner?.charAt(0) || "O"}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">{room.owner}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Joined {new Date(room.createdAt).getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoomDetails;