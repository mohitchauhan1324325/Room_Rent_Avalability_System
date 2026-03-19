import { useEffect, useState } from "react"
import api from "../utils/api";


const ManageBookings = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/api/users");
                setUsers(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    }, []);


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
                    </div>
                ))
            }
        </div>
    )
}

export default ManageBookings
