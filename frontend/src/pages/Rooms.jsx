import { useState, useEffect } from "react";
import api from "../utils/api";

function Rooms () {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get("/api/rooms")
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div>
      {
        rooms.map((room) => (
          <div key={room._id}>
            <h3>{room.title}</h3>
            <p>Price: {room.price}</p>
            {
              room.isAvailable ? ( <button>Rent Room</button> ) : ( <p>Occupied</p> )
            }
          </div>
        ))}
    </div>
  );
}

export default Rooms;