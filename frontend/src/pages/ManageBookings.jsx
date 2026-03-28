import useBookings from "../hooks/useBookings";

const ManageBookings = () => {
  const {
    bookings,
    handleDeleteBooking,
    loading,
    error,
  } = useBookings();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  if (bookings.length === 0) {
    return <h2>No bookings available</h2>;
  }

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking._id}>

          <h3>{booking.user.name}</h3>
          <p>Phone: {booking.user.phone}</p>
          <p>Room_ID: {booking.roomId._id}</p>

          <p>
            Move_In Date:{" "}
            {booking.moveInDate &&
              new Date(booking.moveInDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
          </p>

          <p>Location: {booking.roomId.location}</p>

          <button onClick={() => handleDeleteBooking(booking._id)}>
            Delete Booking
          </button>

        </div>
      ))}
    </div>
  );
};

export default ManageBookings;