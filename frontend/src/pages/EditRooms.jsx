import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../api/roomApi";

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
        const res = await getRoomById(id);
        setRoom(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateRoom(id, room);
      alert("Room updated!");
      navigate("/Rooms");
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 flex items-center justify-center">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Edit Room
        </h2>

        <input
          type="text"
          name="title"
          value={room.title}
          onChange={handleChange}
          placeholder="Room Title"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="description"
          value={room.description}
          onChange={handleChange}
          placeholder="Room Description"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="location"
          value={room.location}
          onChange={handleChange}
          placeholder="Room Location"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="price"
          value={room.price}
          onChange={handleChange}
          placeholder="Room Price"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
        >
          Update Room
        </button>
      </form>
    </div>
  );
};

export default EditRooms;