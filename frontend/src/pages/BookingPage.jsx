import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import BookingForm from "../components/BookingForm";
import { toast } from "react-toastify";
import { createOrder, verifyPayment } from "../api/paymentApi";
import { bookRoom } from "../api/bookingApi";
import Swal from "sweetalert2";
import { getUser } from "../utils/auth";

const BookingPage = () => {
  const location = useLocation();
  const room = location.state;
  const navigate = useNavigate();
  const user = getUser();
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (user.role !== "user") {
        toast.error("Only users can book rooms");
        return;
      }

      if (!room.isAvailable) {
        toast.error("Room not available");
        return;
      }

      if (!user || user.role !== "user") {
        toast.error("Please login first");
        return;
      }

      if (!phone || !date) {
        toast.error("All fields required");
        return;
      }

      const result = await Swal.fire({
        title: "Confirm Booking?",
        text: `Pay ₹${room.price}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Pay",
      });

      if (!result.isConfirmed) return;

      setLoading(true);

      const order = await createOrder(room.price);

      if (!window.Razorpay) {
        toast.error("Payment gateway not loaded");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,

        name: "Room Booking",
        description: "Complete your payment",

        prefill: {
          name: user?.name,
          contact: phone,
        },

        handler: async function (response) {
          try {
            await verifyPayment(response);

            await bookRoom({
              roomId: room._id,
              moveInDate: date,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });

            toast.success("Booking Confirmed 🎉");
            navigate("/rooms");

          } catch (error) {
            toast.error("Payment verification failed");
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.error("Payment cancelled ❌");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      setLoading(false);
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 flex items-center justify-center">

      <BookingForm
        room={room}
        user={user}
        date={date}
        setDate={setDate}
        phone={phone}
        setPhone={setPhone}
        loading={loading}
        handleSubmit={handleSubmit}
      />

    </div>
  );
};

export default BookingPage;