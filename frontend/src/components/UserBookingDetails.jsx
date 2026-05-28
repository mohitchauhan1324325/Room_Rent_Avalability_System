import React from "react";

const UserBookingDetails = ({
  booking,
  deleteBooking,
}) => {

  return (

    <div className="min-h-[80vh] px-4 py-6 md:px-8">

      {/* HEADER */}
      <div
        className="
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-md
          border border-gray-200 dark:border-gray-700
          rounded-xl shadow-lg
          p-4 mb-6
        "
      >

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Booking
        </h1>

      </div>

      {/* CARD */}
      <div
        className="
          max-w-md mx-auto
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-md
          border border-gray-200 dark:border-gray-700
          rounded-2xl shadow-lg
          p-5
          hover:shadow-2xl
          transition duration-300
        "
      >

        {/* USER NAME */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {booking?.user?.name}
        </h3>

        {/* PHONE */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-800 dark:text-white">
            Phone:
          </span>{" "}
          {booking?.user?.phone}
        </p>

        {/* ROOM ID */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-800 dark:text-white">
            Room ID:
          </span>{" "}
          {booking?.roomId?._id}
        </p>

        {/* PAYMENT */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-800 dark:text-white">
            Payment Status:
          </span>{" "}
          <span
            className={`
              font-medium
              ${
                booking?.paymentStatus === "paid"
                  ? "text-green-500"
                  : "text-yellow-500"
              }
            `}
          >
            {booking?.paymentStatus}
          </span>
        </p>

        {/* MOVE IN */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-800 dark:text-white">
            Move-In:
          </span>{" "}
          {booking?.moveInDate &&
            new Date(
              booking?.moveInDate
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
        </p>

        {/* CREATED */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-800 dark:text-white">
            Created At:
          </span>{" "}
          {booking?.createdAt &&
            new Date(
              booking?.createdAt
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
        </p>

        {/* LOCATION */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
          <span className="font-medium text-gray-800 dark:text-white">
            Location:
          </span>{" "}
          {booking?.roomId?.location}
        </p>

        {/* BUTTON */}
        <button
          onClick={() => deleteBooking(booking?._id)}
          className="
            w-full
            bg-red-500 hover:bg-red-600
            text-white
            py-2 rounded-lg
            font-medium
            transition duration-200
          "
        >
          Delete Booking
        </button>

      </div>

    </div>
  );
};

export default UserBookingDetails;