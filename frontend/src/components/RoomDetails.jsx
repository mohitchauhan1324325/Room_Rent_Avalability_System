import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../utils/auth";
import useFavoriteRooms from "../hooks/useFavoriteRooms.js";
import { motion } from "framer-motion";

const RoomDetails = ({
  room,
  handleDelete,
  handleEdit,
}) => {
  const navigate = useNavigate();
  const role = getUserRole();
  const isLoggedIn = isAuthenticated();
  const { addToFavorite } = useFavoriteRooms();

  const ownerPhone = room.owner?.phone?.toString().trim();
  const ownerEmail = room.owner?.email?.toString().trim();
  const ownerName = room.owner?.name || "Owner";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-24">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 items-start">

        {/* LEFT COLUMN: Main Content */}
        <div className="flex-1 min-w-0 w-full flex flex-col gap-8">

          {/* TITLE & HEADER */}
          <div>
            <div className="flex justify-between items-start gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {room.title}
              </h1>

              {/* STATUS BADGE */}
              <div className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm whitespace-nowrap ${room.isAvailable
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
        <div className="w-full lg:w-96 lg:shrink-0 lg:sticky lg:top-24 flex flex-col gap-6">

          {/* BOOKING/PRICE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl p-6 rounded-3xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">₹{room.price}</span>
                <span className="text-gray-500 dark:text-gray-400 text-lg"> / month</span>
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
                {ownerName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">{ownerName}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Joined {new Date(room.createdAt).getFullYear()}</p>
              </div>
            </div>

            {isLoggedIn ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-brand-100 dark:bg-brand-900/30 p-2 text-brand-600 dark:text-brand-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M1.5 4.75A2.75 2.75 0 014.25 2h15.5A2.75 2.75 0 0122.5 4.75v14.5A2.75 2.75 0 0119.75 22H4.25A2.75 2.75 0 011.5 19.25V4.75Zm2.75-.25a.25.25 0 00-.25.25v.08l8.25 5.5 8.25-5.5v-.08a.25.25 0 00-.25-.25H4.25Zm15.5 2.24l-7.06 4.7a.75.75 0 01-.78 0L3.75 6.74v12.51c0 .138.112.25.25.25h15.5a.25.25 0 00.25-.25V6.74Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Email Address</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ownerEmail || "Not Available"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-brand-100 dark:bg-brand-900/30 p-2 text-brand-600 dark:text-brand-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M20.25 16.5c0 1.24-.52 2.36-1.35 3.16-.9.86-2.11 1.34-3.4 1.34-1.3 0-2.62-.49-3.62-1.38l-2.77-2.4a13.8 13.8 0 01-3.76-5.6c-.47-1.3-.48-2.63-.15-3.83.18-.64.45-1.25.83-1.8.41-.6 1.04-1.01 1.73-1.14.77-.14 1.58.09 2.15.57l2.18 1.83c.44.37.71.95.71 1.56 0 .66-.29 1.29-.77 1.68l-.85.71a.75.75 0 00-.2 1.03c.45.74 1.1 1.39 1.84 1.84a.75.75 0 001.03-.2l.71-.85c.39-.48.99-.77 1.65-.77.61 0 1.19.27 1.56.71l1.83 2.18c.48.57.71 1.38.57 2.15-.13.69-.54 1.32-1.14 1.73-.55.38-1.17.65-1.8.83-.44.12-.9.14-1.34.07Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Phone Number</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ownerPhone || "Not Available"}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {ownerPhone ? (
                    <a
                      href={`tel:${ownerPhone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                    >
                      <FaPhone className="w-4 h-4" />
                      Call Owner
                    </a>
                  ) : (
                    <button disabled className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-200 px-4 py-3 text-sm font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                      <FaPhone className="w-4 h-4" />
                      Call Owner
                    </button>
                  )}

                  {ownerPhone ? (
                    <a
                      href={`https://wa.me/91${ownerPhone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-400"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      WhatsApp
                    </a>
                  ) : (
                    <button disabled className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      <FaWhatsapp className="w-4 h-4" />
                      WhatsApp
                    </button>
                  )}

                  {ownerEmail ? (
                    <a
                      href={`mailto:${ownerEmail}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                      <MdEmail className="w-4 h-4" />
                      Send Email
                    </a>
                  ) : (
                    <button disabled className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      <MdEmail className="w-4 h-4" />
                      Send Email
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-4 text-sm text-gray-600 dark:text-gray-300">
                Please log in to view the owner's contact details.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoomDetails;