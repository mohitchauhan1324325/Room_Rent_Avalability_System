import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

const RoomDetails = ({ room }) => {
  return (
    <div className="min-h-[80vh] p-6 flex justify-center items-center">

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg max-w-3xl w-full overflow-hidden hover:shadow-2xl transition">

        {/* Image */}
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={10}
          slidesPerView={1}
        >

          {room.images.map((img, index) => (

            <SwiperSlide key={index}>

              <img
                src={img}
                alt=""
                className="w-full h-64 object-cover"
              />

            </SwiperSlide>

          ))}

        </Swiper>

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

        </div>
      </div>
    </div>
  );
};

export default RoomDetails;