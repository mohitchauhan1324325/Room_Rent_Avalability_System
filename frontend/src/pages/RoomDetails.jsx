import { useEffect, useState } from "react"
import api from "../utils/api";
import { useParams } from "react-router-dom";

const RoomDetails = () => {

    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {

                const res = await api.get(`/api/rooms/${id}`);
                setRoom(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDetails();
    }, [id]);


    return (
        <div>
            <h1>{room?.title}</h1>
            <p>Description: {room?.description}</p>
            <p>Price: {room?.price}</p>
            <p>Location: {room?.location}</p>
        </div>
    )
}

export default RoomDetails
