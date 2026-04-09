
const AllBookings = ({ bookings, handleDeleteBooking }) => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">

            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Manage Bookings
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {booking.user.name}
                        </h3>

                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Phone:</span> {booking.user.phone}
                        </p>

                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Room ID:</span> {booking.roomId._id}
                        </p>

                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Move-In:</span>{" "}
                            {booking.moveInDate &&
                                new Date(booking.moveInDate).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                        </p>

                        <p className="text-sm text-gray-600 mb-4">
                            <span className="font-medium">Location:</span>{" "}
                            {booking.roomId.location}
                        </p>

                        <button
                            onClick={() => handleDeleteBooking(booking._id)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200"
                        >
                            Delete Booking
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllBookings
