
const RoomDetails = ({ room,  }) => {
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full overflow-hidden">

                <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-64 object-cover"
                />

                <div className="p-5">

                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">{room.title}</h1>

                        <span
                            className={`px-3 py-1 rounded text-sm ${room.isAvailable
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                                }`}
                        >
                            {room.isAvailable ? "Available" : "Booked"}
                        </span>
                    </div>

                    <p className="text-gray-600 mt-2">{room.description}</p>

                    <div className="mt-4 space-y-1">
                        <p><strong>Price:</strong> ₹ {room.price}</p>
                        <p><strong>Location:</strong> {room.location}</p>
                        <p><strong>Owner:</strong> {room.owner}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RoomDetails
