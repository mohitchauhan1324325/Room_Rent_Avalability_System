import { useState } from "react"
import { createRoom } from "../api/roomApi";

const AddRooms = () => {

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    price: "",
    location: "",
    owner: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files && files.length > 0 ? files[0] : value
    });
  };

  const handleAddRooms = async (e) => {
    e.preventDefault();

    try {

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await createRoom(data);
      alert("Room Saved!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleAddRooms}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >

      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full"
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="owner"
        placeholder="Owner"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add Room
      </button>
    </form>
  )
}

export default AddRooms
