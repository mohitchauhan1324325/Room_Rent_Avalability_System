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
            <p>{room?.title}</p>
        </div>
    )
}

export default RoomDetails
