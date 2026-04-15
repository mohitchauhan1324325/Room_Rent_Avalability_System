import { useEffect, useState } from "react";
import { deleteBooking, getBookings } from "../api/bookingApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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
    
    const result = await Swal.fire({
      title: "Delete booking?",
      text: "This booking will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    })

    if (!result.isConfirmed) return;

    try {
      await deleteBooking(id);
      setBookings(prev => prev.filter(b => b._id !== id));
      toast.success("Booking deleted successfully!");
    } catch (err) {
      toast.error("Error!", err.message, "error");
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