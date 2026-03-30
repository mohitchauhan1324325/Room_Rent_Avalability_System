import { useState, useEffect } from "react";
import { getRooms, deleteRoom } from "../api/roomApi";
import { useNavigate } from "react-router-dom";

const useRooms = () => {

  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  {/* Get all rooms Occupied/Not Occupied */ }
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      setError("Failed to fetch rooms :", err);
    } finally {
      setLoading(false);
    }
  };

  {/* To navigate the Edit window to update/edit the rooms */ }
  const handleEdit = (id) => {
    navigate(`/EditRooms/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/RoomDetails/${id}`);
  };

  {/* Delete the Rooms by Landlord */ }
  const handleDelete = async (id) => {
    const confimDelete = window.confirm("Are you sure to delete the room");
    if(!confimDelete) return;

    try {
      await deleteRoom(id);
      setRooms(prev => prev.filter(room => room._id !== id));
    } catch (err) {
      setError("Failed to delete room :", err);
    }
  };

  const filteredRooms =
    filter === "available"
      ? rooms.filter(room => room.isAvailable)
      : rooms;

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    filteredRooms,
    setFilter,
    handleDelete,
    handleEdit,
    handleDetails,
    loading,
    error,
  };
};

export default useRooms;