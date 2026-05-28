const BookingDetails = ({ bookings, handleDeleteBooking }) => {
  return (
    <div className="min-h-screen px-4 py-6 md:px-8 dark:bg-gray-950">

      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Manage Bookings
        </h1>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {bookings.map((booking) => (
          <div
            key={booking?._id}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-5 hover:shadow-xl hover:scale-[1.02] transition duration-300 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {booking?.user?.name}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Phone:</span> {booking?.user?.phone}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Room ID:</span> {booking?.roomId?._id}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Payment Status:</span> {booking?.paymentStatus}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Move-In:</span>{" "}
              {booking?.moveInDate &&
                new Date(booking?.moveInDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Created At:</span>{" "}
              {booking?.createdAt &&
                new Date(booking?.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              <span className="font-medium">Location:</span>{" "}
              {booking?.roomId.location}
            </p>

            <button
              onClick={() => handleDeleteBooking(booking?._id)}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200"
            >
              Delete Booking
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default BookingDetails;