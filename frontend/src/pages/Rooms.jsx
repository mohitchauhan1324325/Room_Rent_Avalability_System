import { useNavigate } from "react-router-dom";
import "../styles/room.css";
import RoomsFilter from "../components/RoomsFilter";
import useRooms from "../hooks/useRooms";
import EmptyState from "./EmptyState.jsx";

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
        filteredRooms.map((room) => (
          <div
            className="roomCard"
            key={room._id}
            onClick={room.isAvailable ? () => handleDetails(room._id) : undefined}
          >
            <h3>{room.title}</h3>
            <p>Price: {room.price}</p>
            <p>Location: {room.location}</p>
            <p>Owner: {room.owner}</p>

            {room.isAvailable ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/booking", { state: room });
                }}
                className="btn-primary"
              >
                Rent Room
              </button>
            ) : (
              <p>Occupied</p>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(room._id);
              }}
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(room._id);
              }}
            >
              Delete Room
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Rooms;