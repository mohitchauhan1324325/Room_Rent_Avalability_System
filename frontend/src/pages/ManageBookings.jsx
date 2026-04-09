import BookingDetails from "../components/BookingDetails";
import Loader from "../components/Loader";
import useBookings from "../hooks/useBookings";

const ManageBookings = () => {
  const {
    bookings,
    handleDeleteBooking,
    loading,
    error,
  } = useBookings();

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        {error}
      </div>
    );

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        No bookings available
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

export default ManageBookings;