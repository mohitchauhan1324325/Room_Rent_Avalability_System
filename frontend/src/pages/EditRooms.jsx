import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../utils/api";

const EditRooms = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(
          `/api/rooms/${id}`
        );
        setRoom(res.data);
      } catch (error) {
        console.log(error);
      }
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

  try {
    await api.put(`/api/rooms/${id}`, room);

    alert("Room updated!");
    navigate("/");

  } catch (err) {
    console.log(err);
    alert("Something went wrong!");
  }
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
      name="description"
      value={room.description}
      onChange={handleChange}
      placeholder="Room Description"
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
