import { useState, useEffect } from "react";
import { getRooms, deleteRoom, deleteAllRooms } from "../api/roomApi.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      setError("Failed to fetch rooms : " + err);
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

  // Delete all rooms by Landlord
  const handleDeleteAllRooms = async () => {
    const confirm = window.confirm("Are you sure to delete all rooms");
    if (!confirm) return;

      try {
        setLoading(true);
        await deleteAllRooms();
        toast.success("All rooms deleted successfully!");
        setRooms([]);
        setError(null);

      } catch (error) {
        setError("Failed to delete all rooms :"+ error.message);
      } finally {
        setLoading(false);
      }
  }

  {/* Delete the Rooms by Landlord */ }
  const handleDelete = async (id) => {
    const confimDelete = window.confirm("Are you sure to delete the room");
    if (!confimDelete) return;

    try {
      setLoading(true);
      await deleteRoom(id);
      setRooms(prev => prev.filter(room => room._id !== id));
    } catch (err) {
      setError("Failed to delete room :" + err.message);
    } finally {
      setLoading(false);
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
    handleDeleteAllRooms,
    handleDelete,
    handleEdit,
    handleDetails,
    loading,
    error,
  };
};

export default useRooms;