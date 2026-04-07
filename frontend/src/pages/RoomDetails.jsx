import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getRoomById } from "../api/roomApi.js";

const RoomDetails = () => {

    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await getRoomById(id);

                if (res.message) {
                    alert(res.message);
                    return;
                }

                setRoom(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDetails();
    }, [id]);

    if (!room) return <p>Loading...</p>;

    return (
        <div>
            <h1>{room.title}</h1>
            <img
                src={`${import.meta.env.VITE_API_URL}${room.image}`}
                alt="room"
            />
            <p>Description: {room.description}</p>
            <p>Price: {room.price}</p>
            <p>Location: {room.location}</p>
            <p>Owener: {room.owner}</p>
        </div>
    )
}

export default RoomDetails
