import { use, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getRoomById } from "../api/roomApi.js";
import Loader from "../components/Loader.jsx";
import RoomDetails from "../components/RoomDetails.jsx";
import { toast } from "react-toastify";

const RoomDetailsPage = () => {

    const { id } = useParams();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const res = await getRoomById(id);

                if (res.message) {
                    toast.success(res.message);
                    return;
                }

                setRoom(res);
            } catch (error) {
                toast.error("Failed to load room");
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
        user={user}
        />
    )
}

export default RoomDetailsPage
