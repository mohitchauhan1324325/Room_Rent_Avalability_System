import { useNavigate } from "react-router-dom";

import RoomsFilter from "../components/RoomsFilter.jsx";
import EmptyState from "../components/EmptyState.jsx";
import RoomCard from "../components/RoomCard.jsx";
import Loader from "../components/Loader.jsx";

import useRooms from "../hooks/useRooms.js";

import { getUserRole } from "../utils/auth.js";

const RoomsPage = () => {

  const navigate = useNavigate();

  const role = getUserRole();

  const {
    filteredRooms,
    setFilter,
    handleDeleteAllRooms,
    handleDetails,
    loading,
    error,
  } = useRooms();

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
            rounded-2xl
            shadow-xl
            px-6 py-5
            text-red-500
            font-semibold
          "
        >
          {error}
        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen p-4">

      {/* HEADER */}
      <div
        className="
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-md
          border border-gray-200 dark:border-gray-700
          rounded-2xl
          shadow-xl
          p-4 mb-6

          flex flex-col
          md:flex-row
          md:justify-between
          md:items-center
          gap-4
        "
      >

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Available Rooms
        </h1>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-2">

          {(role === "owner" ||
            role === "admin") && (

            <button
              onClick={() =>
                navigate("/AddRooms")
              }
              className="
                bg-blue-600 hover:bg-blue-700
                text-white
                px-4 py-2
                rounded-xl
                font-medium
                transition duration-200
              "
            >
              Add Room
            </button>
          )}

          {role === "user" ? (

            <button
              onClick={() =>
                navigate("/UserBooking")
              }
              className="
                bg-green-600 hover:bg-green-700
                text-white
                px-4 py-2
                rounded-xl
                font-medium
                transition duration-200
              "
            >
              My Bookings
            </button>

          ) : (

            <button
              onClick={() =>
                navigate("/ManageBookings")
              }
              className="
                bg-green-600 hover:bg-green-700
                text-white
                px-4 py-2
                rounded-xl
                font-medium
                transition duration-200
              "
            >
              Manage Bookings
            </button>
          )}

          {/* ADMIN */}
          {role === "admin" && (

            <button
              onClick={
                handleDeleteAllRooms
              }
              disabled={loading}
              className={`
                px-4 py-2
                rounded-xl
                text-white
                font-medium
                transition duration-200

                ${
                  loading
                    ? `
                      bg-gray-400
                      cursor-not-allowed
                    `
                    : `
                      bg-red-500
                      hover:bg-red-600
                    `
                }
              `}
            >
              {loading
                ? "Deleting..."
                : "Delete All Rooms"}
            </button>
          )}

        </div>

      </div>

      {/* FILTER */}
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

        <RoomsFilter
          setFilter={setFilter}
        />

      </div>

      {/* ROOMS */}
      {filteredRooms.length === 0 ? (

        <EmptyState />

      ) : (

        <RoomCard
          rooms={filteredRooms}
          handleDetails={
            handleDetails
          }
        />
      )}

    </div>
  );
};

export default RoomsPage;