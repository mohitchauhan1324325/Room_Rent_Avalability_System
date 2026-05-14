import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../api/roomApi.js";
import Loader from "../components/Loader.jsx";
import RoomDetails from "../components/RoomDetails.jsx";
import { toast } from "react-toastify";
import useRooms from "../hooks/useRooms.js";

const RoomDetailsPage = () => {
  const { id } = useParams();

  const {
    handleEdit,
    handleDelete
  } = useRooms();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getRoomById(id);

        if (!res) {
          throw new Error("Room not found");
        }

        setRoom(res);
      } catch (error) {
        console.log(error);
        setError("Failed to load room");
        toast.error("Failed to load room");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-red-500 font-semibold">
          {error}
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-gray-600">
          Room not found
        </div>
      </div>
    );
  }

  return <RoomDetails
    room={room}
    handleDelete={handleDelete}
    handleEdit={handleEdit}
  />;

};

export default RoomDetailsPage;