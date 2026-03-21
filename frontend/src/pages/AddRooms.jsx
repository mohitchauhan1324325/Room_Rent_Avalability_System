import { useState } from "react"
import api from "../utils/api";
import { createRoom } from "../api/RoomApi";

const AddRooms = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddRooms = async (e) => {
    e.preventDefault();

    try {
      await createRoom(formData);
      alert("Room Saved!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleAddRooms}>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="title"
          required
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="description"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="price"
          required
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="location"
          required
        />

        <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default AddRooms
