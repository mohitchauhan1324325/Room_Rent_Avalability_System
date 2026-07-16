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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-5">
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl text-red-600 font-semibold border border-red-100 dark:border-red-900/30">
          {error}
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-5">
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl text-gray-700 dark:text-gray-300 font-semibold border border-gray-200 dark:border-gray-700">
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