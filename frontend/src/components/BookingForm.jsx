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
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
        <h2 className="text-xl font-semibold text-gray-800">
          {room.title}
        </h2>

        <p className="text-gray-600 mt-2">
          <span className="font-medium">Price:</span> ₹{room.price}
        </p>

        <p className="text-gray-600">
          <span className="font-medium">Location:</span> {room.location}
        </p>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Booking Form
        </h2>

        {/*  Logged-in User Info */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> {user?.name || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Phone:</span> {user?.phone || phone}
          </p>
        </div>

        {/* Phone Input (optional override) */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/*  Move-in Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/*  Submit */}
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