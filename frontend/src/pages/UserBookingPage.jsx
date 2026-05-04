import Loader from '../components/Loader';
import UserBookingDetails from '../components/UserBookingDetails';
import { useEffect } from 'react';
import useUserBooking from '../hooks/useUserBooking';

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
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-red-500 font-semibold">
          {error}
        </div>
      </div>
    );
  }

  if (userBooking.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-gray-600">
          No bookings found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] px-4 py-6">

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Bookings
        </h1>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userBooking.map((booking) => (
          <UserBookingDetails
            key={booking._id}
            booking={booking}
            deleteBooking={handleDeleteBooking}
          />
        ))}
      </div>

    </div>
  );
};

export default UserBookingPage;