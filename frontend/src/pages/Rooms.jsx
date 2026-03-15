import { useState, useEffect } from "react";
import api from "../utils/api";
import "../styles/room.css";
import "../styles/users.css";

function Rooms () {

  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

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

  return (
    <div className="app">
      {
        rooms.map((room) => (
          <div className="roomCard" key={room._id}>
            <h3>{room.title}</h3>
            <p>Price: {room.price}</p>
            {
              room.isAvailable ? ( <button>Rent Room</button> ) : ( <p>Occupied</p> )
            }
          </div>
        ))}
        {
          users.map((user) => (
            <div className="userCard" key={user._id}>
              <h3>User</h3>
              <p>{user.user.name}</p>
              <p>{user.user.role}</p>
            </div>
          ))
        }
    </div>
  );
}

export default Rooms;