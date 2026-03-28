import useBookings from "../hooks/useBookings";


const ManageBookings = () => {

    const {
        users,
        handleDeleteBooking,
        loading,
        error,
    } = useBookings();

    if (loading) return <h2>Loading...</h2>;

    if (!users || users.length === 0) {
        return <h2>No bookings available</h2>;
    }   

    return (
        <div>
            {
                users.map((user) => (
                    <div key={user._id}>
                        <h3>{user.user.name}</h3>
                        <p>Phone: {user.user.phone}</p>
                        <p>Room_ID: {user.roomId._id}</p>
                        <p>
                            Move_In Date:{" "}
                            {user.moveInDate &&
                                new Date(user.moveInDate).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                        </p>
                        <p>Location: {user.roomId.location}</p>

                        <button onClick={() => handleDeleteBooking(user._id)}>Delete Booking</button>

                    </div>
                ))
            }
        </div>
    )
}

export default ManageBookings
