import { useState, useEffect } from "react";
import { getRooms, deleteRoom, deleteAllRooms } from "../api/roomApi.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../utils/auth.js";
import Swal from "sweetalert2";

const useRooms = () => {

  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleEdit = (id) => {
    navigate(`/EditRooms/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/RoomDetails/${id}`);
  };

  // Delete all rooms by Landlord
  const handleDeleteAllRooms = async () => {

    if (!isAuthenticated()) {
      navigate("/register");
      return;
    }

    const result = await Swal.fire({
      title: "Delete ALL rooms?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all!",
    });

    if (!result.isConfirmed) return;
    try {
      setLoading(true);
      await deleteAllRooms();
      setRooms([]);
      toast.success("All rooms deleted successfully!");
      setError(null);

    } catch (error) {
      toast.error("Error!", error.message, "error");
      setError("Failed to delete all rooms :" + error.message);
    } finally {
      setLoading(false);
    }
  }

  {/* Delete the Rooms by Landlord */ }
  const handleDelete = async (id) => {

    if (!isAuthenticated()) {
      navigate("/register");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This room will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      await deleteRoom(id);
      setRooms(prev => prev.filter(room => room._id !== id));
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error("Error!", err.message, "error");
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