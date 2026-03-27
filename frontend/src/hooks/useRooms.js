import { useState, useEffect } from "react";
import { getRooms, deleteRoom } from "../api/RoomApi";

const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch rooms
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

  const handleDelete = async (id) => {
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
    loading,
    error,
  };
};

export default useRooms;