import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import useFavoriteRooms from "../hooks/useFavoriteRooms.js";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  button,
} from "@material-tailwind/react";

const RoomDetails = ({ room, handleDelete, handleEdit }) => {

  const navigate = useNavigate();
  const role = getUserRole();
  const { addToFavorite } = useFavoriteRooms();

  return (
    <div className="min-h-[80vh] flex justify-center items-center gap-8">
      <div className="bg-white/80 backdrop-blur-md max-w-3xl w-full overflow-hidden">

        <div>
          {/* Image */}
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={10}
            slidesPerView={1}
            className="bg-black/80 overflow-hidden"
          >
            {room.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt=""
                  className="w-full h-[400px] px-16 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          {/* videos */}
          {room.videos?.length > 0 && (
            <Swiper
              modules={[Navigation]}
              navigation={true}
              spaceBetween={10}
              slidesPerView={1}
              className="mt-4 bg-white/ px-4"
            >

              {room.videos.map((video, index) => (
                <SwiperSlide key={index}>
                  <video
                    controls
                    className="w-40 h-40 object-cover rounded-xl"
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Content */}
        <div className="p-6">

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {room.title}
            </h1>

            <span
              className={`px-3 py-1 rounded-lg text-sm shadow ${room.isAvailable
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
                }`}
            >
              {room.isAvailable ? "Available" : "Booked"}
            </span>
          </div>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {room.description}
          </p>

          <div className="mt-5 space-y-2 text-gray-700">
            <p>
              <strong className="text-gray-800">Price:</strong> ₹ {room.price}
            </p>
            <p>
              <strong className="text-gray-800">Location:</strong> {room.location}
            </p>
            <p>
              <strong className="text-gray-800">Owner:</strong> {room.owner}
            </p>
          </div>

          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
            type="button"
            onClick={() => viewRating(room._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
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
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(room._id);
              }}
              className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg transition"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(room._id);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
            >
              Delete
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white/80 backdrop-blur-md w-[400px] h-[200px] p-4 max-w-3xl overflow-hidden">
          <div className="flex justify-between items-center h-10">
            <h1 className="text-3xl font-bold text-black">
              ₹{room.price}
            </h1>

            <IconButton
              type="button"
              size="sm"
              color="red"
              variant="text"
              className="!absolute top-4 right-4 rounded-full z-50"
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
                className="h-6 w-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>
          </div>

          <div className="text-2xl text-black h-[80px]">
            {room.title}
          </div>

          <div className="flex gap-20">
            <p className="text-sm text-gray-800 w-60">
              {room.location}
            </p>

            <Typography color="gray" className="text-sm ">
              {new Date(room.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long"
              })}
            </Typography>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md w-[400px] h-[200px] p-4 max-w-3xl overflow-hidden">
          <div className="flex gap-2">
            <img className="w-10 h-10 rounded-full" src="/colored-logo.png" alt="Rounded avatar" />

            <p className="text-2xl text-black h-20">
              Posted by <strong className="text-blue-500">{room.owner}</strong>
            </p>
          </div>

          <CardFooter className="pt-3">
            <Button
              size="lg"
              fullWidth={true}
              onClick={(e) => {
                e.stopPropagation();
                navigate("/booking", { state: room });
              }}
            >
              Reserve
            </Button>
          </CardFooter>
        </div>
        <div className="bg-white/80 backdrop-blur-md w-[400px] h-[250px] p-4 max-w-3xl overflow-hidden">
          <p className="text-2xl text-black">
            Posted In
          </p>
          <p className="text-gray-800">
            {room.location}
          </p>
        </div>
      </div>

    </div>
  );
};

export default RoomDetails;