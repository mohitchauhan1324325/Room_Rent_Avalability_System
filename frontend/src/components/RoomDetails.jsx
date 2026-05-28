import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import useFavoriteRooms from "../hooks/useFavoriteRooms.js";

import {
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const RoomDetails = ({
  room,
  handleDelete,
  handleEdit,
}) => {

  const navigate = useNavigate();

  const role = getUserRole();

  const { addToFavorite } = useFavoriteRooms();

  return (

    <div className="min-h-[80vh] flex flex-col lg:flex-row justify-center items-start gap-6 p-4">

      {/* LEFT */}
      <div
        className="
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-md
          border border-gray-200 dark:border-gray-700
          shadow-xl
          max-w-3xl w-full
          overflow-hidden rounded-2xl
        "
      >

        {/* IMAGE SWIPER */}
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={10}
          slidesPerView={1}
          className="bg-black overflow-hidden"
        >

          {room.images.map((img, index) => (

            <SwiperSlide key={index}>

              <img
                src={img}
                alt=""
                className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover"
              />

            </SwiperSlide>
          ))}

        </Swiper>

        {/* VIDEO SWIPER */}
        {room.videos?.length > 0 && (

          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={10}
            slidesPerView={1}
            className="mt-4 px-4"
          >

            {room.videos.map((video, index) => (

              <SwiperSlide key={index}>

                <video
                  controls
                  className="w-full h-[250px] object-cover rounded-xl"
                >
                  <source src={video} type="video/mp4" />
                </video>

              </SwiperSlide>
            ))}

          </Swiper>
        )}

        {/* CONTENT */}
        <div className="p-6">

          {/* TITLE */}
          <div className="flex justify-between items-center gap-4">

            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {room.title}
            </h1>

            <span
              className={`
                px-3 py-1 rounded-lg text-sm shadow text-white
                ${room.isAvailable
                  ? "bg-green-500"
                  : "bg-red-500"}
              `}
            >
              {room.isAvailable ? "Available" : "Booked"}
            </span>

          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
            {room.description}
          </p>

          {/* DETAILS */}
          <div className="mt-5 space-y-2 text-gray-700 dark:text-gray-300">

            <p>
              <strong className="text-gray-800 dark:text-white">
                Price:
              </strong>{" "}
              ₹ {room.price}
            </p>

            <p>
              <strong className="text-gray-800 dark:text-white">
                Location:
              </strong>{" "}
              {room.location}
            </p>

            <p>
              <strong className="text-gray-800 dark:text-white">
                Owner:
              </strong>{" "}
              {room.owner}
            </p>

          </div>

          {/* RATING */}
          <Typography
            className="
              flex items-center gap-1.5 font-normal mt-4
              text-gray-700 dark:text-gray-300
            "
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-500"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>

            5.0

          </Typography>

        </div>

        {/* ADMIN / OWNER */}
        {(role === "admin" || role === "owner") && (

          <div className="flex gap-4 p-6 pt-0">

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(room._id);
              }}
              className="
                bg-yellow-400 hover:bg-yellow-500
                text-black
                px-4 py-2 rounded-lg transition
              "
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(room._id);
              }}
              className="
                bg-red-500 hover:bg-red-600
                text-white
                px-4 py-2 rounded-lg transition
              "
            >
              Delete
            </button>

          </div>
        )}

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full lg:w-[400px] flex flex-col gap-4">

        {/* PRICE CARD */}
        <div
          className="
            relative
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-md
            border border-gray-200 dark:border-gray-700
            shadow-lg
            w-full h-[200px]
            p-4 rounded-2xl
          "
        >

          <div className="flex justify-between items-center">

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              ₹{room.price}
            </h1>

            <IconButton
              type="button"
              size="sm"
              variant="text"
              className="
                rounded-full
                bg-black/20 dark:bg-black/40
              "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();

                addToFavorite(room._id);
              }}
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={"currentColor"}
                className="h-6 w-6 text-red-500"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>

            </IconButton>

          </div>

          <div className="text-2xl text-gray-800 dark:text-white mt-4">
            {room.title}
          </div>

          <div className="flex justify-between items-center mt-6 gap-4">

            <p className="text-sm text-gray-700 dark:text-gray-300">
              {room.location}
            </p>

            <Typography className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(room.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long"
              })}
            </Typography>

          </div>

        </div>

        {/* OWNER CARD */}
        <div
          className="
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-md
            border border-gray-200 dark:border-gray-700
            shadow-lg
            w-full
            p-4 rounded-2xl
          "
        >

          <div className="flex gap-3 items-center">

            <img
              className="w-12 h-12 rounded-full"
              src="/colored-logo.png"
              alt="avatar"
            />

            <p className="text-lg text-gray-800 dark:text-white">
              Posted by{" "}
              <strong className="text-blue-500">
                {room.owner}
              </strong>
            </p>

          </div>

          <CardFooter className="pt-6 px-0 pb-0">

            {room.isAvailable ? (

              <Button
                size="lg"
                fullWidth={true}
                onClick={(e) => {
                  e.stopPropagation();

                  navigate("/booking", {
                    state: room,
                  });
                }}
              >
                Reserve
              </Button>

            ) : (

              <Button
                size="lg"
                fullWidth={true}
                disabled
              >
                Booked
              </Button>

            )}

          </CardFooter>

        </div>

        {/* LOCATION CARD */}
        <div
          className="
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-md
            border border-gray-200 dark:border-gray-700
            shadow-lg
            w-full
            p-4 rounded-2xl
          "
        >

          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            Posted In
          </p>

          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {room.location}
          </p>

        </div>

      </div>

    </div>
  );
};

export default RoomDetails;