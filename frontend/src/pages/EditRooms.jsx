import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../utils/api";

const EditRooms = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [room, setRoom] = useState({
    title: "",
    location: "",
    price: ""
  });

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await api.get(
        `/api/rooms/${id}`
      );
      setRoom(res.data);
    };

    fetchRoom();

  }, [id]);

  const handleChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(`/api/rooms/${id}`, room);

    alert("Room updated!");

    navigate("/");

  };

  return (
    <form onSubmit={handleSubmit} >

      <input
        type="text"
        name="title"
        value={room.title}
        onChange={handleChange}
        placeholder="Room Title"
      />

      <input
        type="text"
        name="location"
        value={room.location}
        onChange={handleChange}
        placeholder="Room Location"
      />

      <input
        type="number"
        name="price"
        value={room.price}
        onChange={handleChange}
        placeholder="Room Price"
      />

      <button type="submit">Update Room</button>

    </form>
  )
}

export default EditRooms
