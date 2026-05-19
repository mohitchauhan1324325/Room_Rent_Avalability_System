import { useNavigate } from "react-router-dom";
import RoomsFilter from "../components/RoomsFilter.jsx";
import useRooms from "../hooks/useRooms.js";
import EmptyState from "../components/EmptyState.jsx";
import RoomCard from "../components/RoomCard.jsx";
import Loader from "../components/Loader.jsx";
import { getUserRole } from "../utils/auth.js";
import useFavoriteRooms from "../hooks/useFavoriteRooms.js";

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
  
  const {
    addToFavorite
  } = useFavoriteRooms();

  if (loading) return <Loader />;
  if (error) return <p className="text-white text-center mt-10">{error}</p>;

  return (
    <div className="min-h-screen p-4">

      {/* HEADER */}
      <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <h1 className="text-2xl font-bold text-white">
          Available Rooms
        </h1>

        <div className="flex flex-wrap gap-2">

          {(role === "owner" || role === "admin") && (
            <button
              onClick={() => navigate("/AddRooms")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Room
            </button>
          )}

          {role === "user" ? (
            <button
              onClick={() => navigate("/UserBooking")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              My Bookings
            </button>
          ) : (
            <button
              onClick={() => navigate("/ManageBookings")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Manage Bookings
            </button>
          )}

          {role === "admin" && (
            <button
              onClick={handleDeleteAllRooms}
              disabled={loading}
              className={`px-4 py-2 rounded text-white transition ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
                }`}
            >
              {loading ? "Deleting..." : "Delete All Rooms"}
            </button>
          )}

        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6">
        <RoomsFilter setFilter={setFilter} />
      </div>

      {/* ROOMS */}
      {filteredRooms.length === 0 ? (
        <EmptyState />
      ) : (
        <RoomCard
          rooms={filteredRooms}
          handleDetails={handleDetails}
          addToFavorite={addToFavorite}
        />
      )}

    </div>
  );
};

export default RoomsPage;