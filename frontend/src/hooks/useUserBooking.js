import { useEffect, useState } from "react";
import { cancelBookingByUser, getMyBooking } from "../api/bookingApi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const useUserBooking = () => {

      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [userBooking, setUserBooking] = useState([]);

    const handleDetailBooking = async () => {
          try {
            setLoading(true);
            const res = await getMyBooking();
            const bookings = Array.isArray(res) ? res : res?.bookings || [];
            setUserBooking(bookings);
          } catch (error) {
            setError("Failed to load booking");
            console.log(error);
            
            toast.error("Booking not fetch");
          } finally {
            setLoading(false);
          }
      
      }
    
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
            setLoading(true);
            await cancelBookingByUser(id);
            setUserBooking(prev => prev.filter(b => b._id !== id));
            toast.success("Booking deleted successfully!");
          } catch (err) {
            toast.error("Error!");
            setError("Failed to delete booking");
          } finally {
            setLoading(false);
          }
        };

  return {
    userBooking,
    handleDetailBooking,
    handleDeleteBooking,
    loading,
    error,
  };
};

export default useUserBooking;
