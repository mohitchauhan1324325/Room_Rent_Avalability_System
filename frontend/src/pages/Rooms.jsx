import { useState, useEffect } from "react";
import api from "../utils/api";
import "../styles/room.css";
import "../styles/users.css";
import { useNavigate } from "react-router-dom"
import RoomsFilter from "../comonents/RoomsFilter";

const Rooms = () => {

  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/api/rooms")
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    api.get("/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const handleEdit = (id) => {
    navigate(`/EditRooms/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;

      await api.delete(`/api/rooms/${id}`);

      setRooms(rooms.filter(room => room._id !== id));
    }
    catch (error) {
      console.log(error);
    }
  };

  const filteredRooms = filter === "available" ? rooms.filter((room) => room.isAvailable) : rooms;

  return (
    <div className="app">

      {/* Filter Component */}
      <RoomsFilter setFilter={setFilter} />
      <button onClick={() => navigate("/AddRooms")}>Add Rooms</button>
      {filteredRooms.length === 0 ? (
        <p>No rooms found</p>
      ) : (
        <>
          {/* Rooms List */}
          {filteredRooms.map((room) => (
            <div className="roomCard" key={room._id}>
              <h3>{room.title}</h3>
              <p>Price: {room.price}</p>
              <p>Location: {room.location}</p>

              {room.isAvailable ? (
                <button onClick={() => navigate("/booking", { state: room })}>
                  Rent Room
                </button>
              ) : (
                <p>Occupied</p>
              )}

              <button onClick={() => handleEdit(room._id)}>Edit</button>
              <button onClick={() => handleDelete(room._id)}>
                Delete Room
              </button>
            </div>
          ))}

          {/* Users List */}
          {users.map((user) => (
            <div className="userCard" key={user._id}>
              <h3>Users</h3>
              <p>Name: {user.user.name}</p>
              <p>Phone: {user.user.phone}</p>
            </div>
          ))}
        </>
      )}

    </div>
  );
}

export default Rooms;