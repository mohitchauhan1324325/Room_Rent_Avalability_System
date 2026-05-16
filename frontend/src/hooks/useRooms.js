import { useState, useEffect } from "react";
import {
  getRooms,
  deleteRoom,
  deleteAllRooms,
  createFavoriteRoom,
  getMyFavoriteRooms
} from "../api/roomApi.js";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../utils/auth.js";
import Swal from "sweetalert2";

const useRooms = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const data = await getRooms();

      setRooms(data);

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

  const addToFavorite = async (id) => {
    try {
      setLoading(true);

      await createFavoriteRoom(id);

      const res = await getMyFavoriteRooms();

      setFavorite(res);

      toast.success("Added to favorites");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to add favorite"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const fetchFavoriteRoom = async () => {
      try {
        setLoading(true);

        const res = await getMyFavoriteRooms();

        setFavorite(res);

      } catch (error) {
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRoom();

  }, []);

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
  }, []);

  return {
    rooms,
    favorite,
    filteredRooms,
    setFilter,
    addToFavorite,
    handleDeleteAllRooms,
    handleDelete,
    handleEdit,
    handleDetails,
    loading,
    error,
  };
};

export default useRooms;