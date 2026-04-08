import { useNavigate } from "react-router-dom";

const RoomCard = ({ rooms, handleDelete, handleEdit, handleDetails }) => {

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
          onClick={() =>
            room.isAvailable && handleDetails(room._id)
          }
        >

          {/* Image */}
          <div className="relative">
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-48 object-cover"
            />

            {/* Status Badge */}
            <span
              className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${room.isAvailable
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                }`}
            >
              {room.isAvailable ? "Available" : "Booked"}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{room.title}</h3>
            <p className="text-gray-500 text-sm">{room.location}</p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-blue-600 font-bold">
                ₹ {room.price}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-3">
              {room.isAvailable ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/booking", { state: room });
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Rent
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-300 px-3 py-1 rounded cursor-not-allowed"
                >
                  Booked
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(room._id);
                }}
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(room._id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoomCard
