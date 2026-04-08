import { useNavigate } from "react-router-dom";
import RoomsFilter from "../components/RoomsFilter.jsx";
import useRooms from "../hooks/useRooms.js";
import EmptyState from "../components/EmptyState.jsx";
import RoomCard from "../components/RoomCard.jsx";

const Rooms = () => {
  const navigate = useNavigate();

  const {
    filteredRooms,
    setFilter,
    handleDelete,
    handleEdit,
    handleDetails,
    loading,
    error,
  } = useRooms();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Available Rooms</h1>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/AddRooms")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Room
          </button>

          <button
            onClick={() => navigate("/ManageBookings")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Bookings
          </button>
        </div>
      </div>

      <RoomsFilter setFilter={setFilter} />

      {filteredRooms.length === 0 ? (
        <EmptyState />
      ) : (
        <RoomCard
          rooms={filteredRooms}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleDetails={handleDetails}
        />
      )}
    </div>
  );
};

export default Rooms;