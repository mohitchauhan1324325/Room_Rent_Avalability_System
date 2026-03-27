import { useEffect, useState } from "react"
import { deleteBooking, getBookings } from "../api/bookingApi";


const ManageBookings = () => {

    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getBookings();
                setUsers(res);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (loading) return <h2>Loading...</h2>;

    if (!users || users.length === 0) {
        return <h2>No bookings available</h2>;
    }   

    const handleDeleteBooking = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        try {
            await deleteBooking(id);

            setUsers(prev => prev.filter(b => b._id !== id));

        } catch (error) {
            console.log(error);
        }
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
