import { useState, useEffect } from "react";
import api from "../utils/api";
import "../styles/room.css";
import "../styles/users.css";
import { useNavigate } from "react-router-dom"
import RoomsFilter from "../comonents/RoomsFilter";
import { deleteRoom, getRooms } from "../api/RoomApi";

const Rooms = () => {

  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("all");

  {/* Get all rooms Occupied/Not Occupied */ }
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await getRooms();
        setRooms(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRoom();
  }, []);

  {/* To navigate the Edit window to update/edit the rooms */ }
  const handleEdit = (id) => {
    navigate(`/EditRooms/${id}`);
  };

  {/* Delete the Rooms by Landlord */ }
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;

      await deleteRoom(id);

      setRooms(rooms.filter(room => room._id !== id));
    }
    catch (error) {
      console.log(error);
    }
  };

  {/* Filter the room available/not available */ }
  const filteredRooms = filter === "available" ? rooms.filter((room) => room.isAvailable) : rooms;

  {/* navigate to room details window */ }
  const handleDetails = (id) => {
    navigate(`/RoomDetails/${id}`);
  }

  return (
    <div className="app">

      {/* Filter Component */}
      <RoomsFilter setFilter={setFilter} />

      {/* Add Rooms by Landlord */}
      <button onClick={() => navigate("/AddRooms")}>Add Rooms</button>

      {/* Manages all bookings details */}
      <button onClick={() => navigate("/ManageBookings")}>All Bookings here</button>

      {/* Filter Conditions */}
      {filteredRooms.length === 0 ? (
        <p>No rooms found</p>
      ) : (
        <>
          {/* Rooms List */}
          {filteredRooms.map((room) => (

            <div
              className="roomCard"
              key={room._id}
              onClick={() => handleDetails(room._id)}
            >

              <h3>{room.title}</h3>
              <p>Price: {room.price}</p>
              <p>Location: {room.location}</p>

              {room.isAvailable ? (
                <button onClick={(e) => {
                  e.stopPropagation();                                  // Stop the click event go to the parent elements
                  navigate("/booking", { state: room });
                }}
                >
                  Rent Room
                </button>
              ) : (
                <div>
                  <p>Occupied</p>
                </div>
              )}

              <button onClick={(e) => {
                e.stopPropagation();              // Stop the click event go to the parent elements
                handleEdit(room._id);
              }}
              >
                Edit
              </button>

              <button onClick={(e) => {
                e.stopPropagation();          // Stop the click event go to the parent elements
                handleDelete(room._id);
              }}
              >
                Delete Room
              </button>

            </div>
          ))}

        </>
      )}

    </div>
  );
}

export default Rooms;