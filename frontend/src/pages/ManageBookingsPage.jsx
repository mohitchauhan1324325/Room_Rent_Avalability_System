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
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-red-500 font-semibold">
          {error}
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-gray-600 text-lg">
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