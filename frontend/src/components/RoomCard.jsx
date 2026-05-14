import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const RoomCard = ({ rooms, handleDelete, handleEdit, handleDetails }) => {
  const navigate = useNavigate();
  const role = getUserRole();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

      {rooms.map((room) => (
        <div
          key={room._id}
          className="bg-white/80 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition duration-300 cursor-pointer"
          onClick={() => room.isAvailable && handleDetails(room._id)}
        >

          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={room.images[0]}
              alt={room.title}
              className="w-full h-48 object-cover transition duration-300 hover:scale-110"
            />

            {/* Status Badge */}
            <span
              className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-lg shadow ${room.isAvailable
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
                }`}
            >
              {room.isAvailable ? "Available" : "Booked"}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">

            <h3 className="text-lg font-semibold text-gray-800">
              {room.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {room.location}
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-blue-600 font-bold text-lg">
                ₹ {room.price}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">

              {/* USER RENT */}
              {room.isAvailable && role === "user" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/booking", { state: room });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition"
                >
                  Rent
                </button>
              )}

              {!room.isAvailable && (
                <button
                  disabled
                  className="bg-gray-300 px-3 py-1 text-black rounded-lg cursor-not-allowed"
                >
                  Booked
                </button>
              )}

            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default RoomCard;