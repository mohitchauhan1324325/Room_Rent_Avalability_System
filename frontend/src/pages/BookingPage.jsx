import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import BookingForm from "../components/BookingForm";
import { toast } from "react-toastify";
import { createOrder, verifyPayment } from "../api/paymentApi";
import { bookRoom } from "../api/bookingApi";
import Swal from "sweetalert2";
import { getUser } from "../utils/auth";
import { motion } from "framer-motion";

const BookingPage = () => {
  const location = useLocation();
  const room = location.state;
  const navigate = useNavigate();
  const user = getUser();
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  if (!room?._id) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No room selected</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Please go back and choose a room before booking.</p>
          <button
            onClick={() => navigate("/rooms")}
            className="rounded-xl bg-brand-600 px-5 py-3 text-white font-semibold"
          >
            Browse Rooms
          </button>
        </div>
      </div>
    );
  }

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
        text: `You will be charged ₹${room.price} for this reservation.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4f46e5", // brand-600
        cancelButtonColor: "#d1d5db",
        confirmButtonText: "Yes, Pay Now",
        customClass: {
          container: "dark:bg-gray-900/80 backdrop-blur-sm",
          popup: "dark:bg-gray-800 dark:text-white rounded-3xl",
          title: "dark:text-white",
          htmlContainer: "dark:text-gray-300"
        }
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
        name: "StayNest",
        description: `Booking for ${room.title}`,
        theme: {
          color: "#4f46e5",
        },
        prefill: {
          name: user?.name,
          contact: phone,
        },
        handler: async function (response) {
          try {
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (!verifyRes.success) {
              toast.error("Payment verification failed ❌");
              return;
            }

            await bookRoom({
              roomId: room._id,
              moveInDate: date,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });

            toast.success("Booking Confirmed 🎉");
            navigate("/rooms");

          } catch (error) {
            console.log("ERROR:", error);
            toast.error(error.response?.data?.message || "Booking failed ❌");
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-28 sm:pt-32 lg:pt-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row gap-10"
        >
          {/* Left Side: Booking Form */}
          <div className="flex-1">
            <div className="mb-8">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
                Back
              </button>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Request to book</h1>
            </div>

            <BookingForm
              user={user}
              date={date}
              setDate={setDate}
              phone={phone}
              setPhone={setPhone}
              loading={loading}
              handleSubmit={handleSubmit}
              room={room}
            />
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-[450px]">
            <div className="sticky top-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl p-6">
              <div className="flex gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <img 
                  src={room.images?.[0] || "/placeholder.jpg"} 
                  alt="Room" 
                  className="w-28 h-28 object-cover rounded-2xl"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-2">{room.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{room.location}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    5.00
                  </div>
                </div>
              </div>

              <div className="py-6 border-b border-gray-200 dark:border-gray-700 space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-xl">Price details</h3>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>₹{room.price} x 1 night</span>
                  <span>₹{room.price}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Taxes and fees</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="pt-6 flex justify-between font-extrabold text-gray-900 dark:text-white text-xl">
                <span>Total (INR)</span>
                <span>₹{room.price}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default BookingPage;