import { useState, useEffect } from "react";
import {
  getRooms,
  getMyRooms,
  deleteRoom,
  deleteAllRooms,
  createFavoriteRoom,
  getMyFavoriteRooms
} from "../api/roomApi.js";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../utils/auth.js";
import Swal from "sweetalert2";

const useRooms = (options = {}) => {
  const navigate = useNavigate();
  const { ownerOnly = false } = options;

  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    nextCursor: null,
    hasMore: false,
    limit: 10,
  });

  const fetchRooms = async () => {
    try {
      setLoading(true);

      if (ownerOnly) {
        const data = await getMyRooms();
        setRooms(Array.isArray(data) ? data : []);
        setPagination({
          nextCursor: null,
          hasMore: false,
          limit: data?.length || 0,
        });
      } else {
        const data = await getRooms();

        setRooms(Array.isArray(data.rooms) ? data.rooms : []);
        setPagination(data.pagination);
      }

    } catch (err) {
      setError("Failed to fetch rooms: " + err.message);
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

    } catch (error) {

      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

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
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {

      setLoading(true);

      await deleteRoom(id);

      setRooms(prev =>
        prev.filter(room => room._id !== id)
      );

      toast.success("Room deleted");

    } catch (err) {

      setError(err.message);

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
  }, [ownerOnly]);

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
    pagination,
  };
};

export default useRooms;