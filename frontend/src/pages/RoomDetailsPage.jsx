import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getRoomById } from "../api/roomApi.js";
import Loader from "../components/Loader.jsx";
import RoomDetails from "../components/RoomDetails.jsx";

const RoomDetailsPage = () => {

    const { id } = useParams();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const res = await getRoomById(id);

                if (res.message) {
                    alert(res.message);
                    return;
                }

                setRoom(res);
            } catch (error) {
                alert("Failed to load room");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading || !room) return <Loader />;

    return (
        <RoomDetails
        room={room}
        />
    )
}

export default RoomDetailsPage
