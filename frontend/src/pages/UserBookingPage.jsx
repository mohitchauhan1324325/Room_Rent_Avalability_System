import { useEffect } from "react";

import Loader from "../components/Loader";
import UserBookingDetails from "../components/UserBookingDetails";

import useUserBooking from "../hooks/useUserBooking";

const UserBookingPage = () => {

  const {
    userBooking,
    handleDetailBooking,
    handleDeleteBooking,
    loading,
    error,
  } = useUserBooking();

  /* FETCH */
  useEffect(() => {

    handleDetailBooking();

  }, []);

  /* LOADER */
  if (loading) return <Loader />;

  /* ERROR */
  if (error) {

    return (

      <div
        className="
          min-h-[60vh]
          flex items-center justify-center
          px-4
        "
      >

        <div
          className="
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-md
            border border-gray-200 dark:border-gray-700
            p-6 rounded-2xl
            shadow-xl
            text-red-500
            font-semibold
          "
        >
          {error}
        </div>

      </div>
    );
  }

  /* EMPTY */
  if (userBooking.length === 0) {

    return (

      <div
        className="
          min-h-[60vh]
          flex items-center justify-center
          px-4
        "
      >

        <div
          className="
            bg-white/80 dark:bg-gray-900/80
            backdrop-blur-md
            border border-gray-200 dark:border-gray-700
            p-6 rounded-2xl
            shadow-xl
            text-gray-700 dark:text-gray-300
          "
        >
          No bookings found
        </div>

      </div>
    );
  }

  return (

    <div className="min-h-[80vh] px-4 py-6">

      {/* HEADER */}
      <div
        className="
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-md
          border border-gray-200 dark:border-gray-700
          rounded-2xl
          shadow-xl
          p-4 mb-6
        "
      >

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Bookings
        </h1>

      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {userBooking.map((booking) => (

          <UserBookingDetails
            key={booking._id}
            booking={booking}
            deleteBooking={
              handleDeleteBooking
            }
          />
        ))}

      </div>

    </div>
  );
};

export default UserBookingPage;