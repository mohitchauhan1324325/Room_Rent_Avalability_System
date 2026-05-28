const BookingForm = ({
  room,
  user,
  date,
  setDate,
  phone,
  setPhone,
  loading,
  handleSubmit
}) => {
  return (
    <div className="w-full max-w-2xl space-y-6">

      {/* Room Info Card */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {room.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          <span className="font-medium">Price:</span> ₹{room.price}
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Location:</span> {room.location}
        </p>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-5 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          Booking Form
        </h2>

        {/* User Info */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Name:</span> {user?.name || "N/A"}
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Phone:</span> {user?.phone || phone}
          </p>
        </div>

        {/* Phone Input */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Move-in Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !room.isAvailable}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition duration-200 disabled:opacity-60"
        >
          {loading
            ? "Processing..."
            : room.isAvailable
            ? "Confirm & Pay"
            : "Room Not Available"}
        </button>
      </form>

    </div>
  );
};

export default BookingForm;