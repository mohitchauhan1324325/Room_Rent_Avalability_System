import BookingDetails from "../components/BookingDetails";
import Loader from "../components/Loader";
import useBookings from "../hooks/useBookings";

const ManageBookingsPage = () => {
  const {
    bookings,
    handleDeleteBooking,
    loading,
    error,
  } = useBookings();

  if (loading) return <Loader />;

  if (error) {
    return (
      <div
        className="
          min-h-[60vh]
          flex items-center justify-center
          px-4
        "
      >

        <div
          className="
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-md
            border border-gray-200 dark:border-gray-700
            p-6 rounded-2xl
            shadow-xl
            text-red-500
            font-semibold
          "
        >
          {error}
        </div>

      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div
        className="
          min-h-[60vh]
          flex items-center justify-center
          px-4
        "
      >

        <div
          className="
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-md
            border border-gray-200 dark:border-gray-700
            p-6 rounded-2xl
            shadow-xl
            text-gray-700 dark:text-gray-300
            text-lg
          "
        >
          No bookings available
        </div>

      </div>
    );
  }

  return (
    <BookingDetails
      bookings={bookings}
      handleDeleteBooking={handleDeleteBooking}
    />
  );
};

export default ManageBookingsPage;