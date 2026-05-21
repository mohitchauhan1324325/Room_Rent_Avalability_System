import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getMyFavoriteRooms,
  createFavoriteRoom
} from "../api/roomApi";
import { isAuthenticated } from "../utils/auth";

const useFavoriteRooms = () => {
  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavoriteRoom = async () => {
    try {
      setLoading(true);

      const res = await getMyFavoriteRooms();

      setFavorite(res);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorite = async (id) => {
    try {
      setLoading(true);

      if(!isAuthenticated()){
        toast.error("Please login first");
        return;
      }

      await createFavoriteRoom(id);

      await fetchFavoriteRoom();

      toast.success("Added to favorites");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteRoom();
  }, []);

  return {
    favorite,
    addToFavorite,
    loading,
    error,
  };
};

export default useFavoriteRooms;