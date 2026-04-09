import { useState } from "react"
import { createRoom } from "../api/roomApi";
import Loader from "../components/Loader";

const AddRooms = () => {

  const [loading, setLoading] = useState(false);
  const initialState = {
    title: "",
    price: "",
    location: "",
    image: null
  };

  const [formData, setFormData] = useState(initialState);

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
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("location", formData.location);
      data.append("description", formData.description);
      data.append("image", formData.image);

      await createRoom(data);

      alert("Room Saved!");
      setFormData(initialState);
    } catch (error) {
      console.log(error);
      alert("Error saving room");
    } finally {
      setLoading(false);
    }
  };

  if(loading) return <Loader /> ;

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
        required
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full"
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
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
