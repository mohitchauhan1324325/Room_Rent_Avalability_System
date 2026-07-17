const BookingForm = ({
  user,
  date,
  setDate,
  phone,
  setPhone,
  loading,
  handleSubmit,
  room,
}) => {
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-8">

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                value={user?.name || "N/A"}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trip dates</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Move-in Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full max-w-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Cancellation Policy
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            You can cancel your booking free of charge within 48 hours of confirmation. After that period, cancellation charges may apply depending on the host's cancellation policy. Please review the policy carefully before making a reservation.
          </p>

          <button
            type="submit"
            disabled={loading || !room.isAvailable}
            className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-brand-500/30 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading
              ? "Processing..."
              : room.isAvailable
                ? "Confirm & Pay"
                : "Room Not Available"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;