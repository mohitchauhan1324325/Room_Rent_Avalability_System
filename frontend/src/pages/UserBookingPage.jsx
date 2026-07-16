import { useEffect } from "react";
import Loader from "../components/Loader";
import UserBookingDetails from "../components/UserBookingDetails";
import { motion } from "framer-motion";
import useUserBooking from "../hooks/useUserBooking";

const UserBookingPage = () => {
  const {
    userBooking,
    handleDetailBooking,
    handleDeleteBooking,
    loading,
    error,
  } = useUserBooking();

  useEffect(() => {
    handleDetailBooking();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 border border-red-100 dark:border-red-900/30 p-8 rounded-3xl shadow-xl text-red-600 font-semibold max-w-md w-full text-center">
          {error}
        </div>
      </div>
    );
  }

  if (userBooking.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No bookings yet</h2>
          <p className="text-gray-500 dark:text-gray-400">Time to dust off your bags and start planning your next adventure.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-28 sm:pt-32 lg:pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Bookings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your upcoming and past reservations.</p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {userBooking.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <UserBookingDetails
                booking={booking}
                deleteBooking={handleDeleteBooking}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBookingPage;
