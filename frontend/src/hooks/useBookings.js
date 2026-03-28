import { useEffect, useState } from "react";
import { deleteBooking, getBookings } from "../api/bookingApi";

const useBookings = () => {
  const [bookings, setBookings] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getBookings();
        setBookings(res);
      } catch (err) {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await deleteBooking(id);
      setBookings(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      setError("Failed to delete booking");
    }
  };

  return {
    bookings,
    handleDeleteBooking,
    loading,
    error,
  };
};

export default useBookings;