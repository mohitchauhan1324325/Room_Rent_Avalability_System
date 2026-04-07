import { useNavigate } from "react-router-dom";
import "../styles/room.css";
import RoomsFilter from "../components/RoomsFilter.jsx";
import useRooms from "../hooks/useRooms.js";
import EmptyState from "./EmptyState.jsx";
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
    <div className="app">

      <RoomsFilter setFilter={setFilter} />

      <button onClick={() => navigate("/AddRooms")}>
        Add Rooms
      </button>

      <button onClick={() => navigate("/ManageBookings")}>
        All Bookings here
      </button>

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