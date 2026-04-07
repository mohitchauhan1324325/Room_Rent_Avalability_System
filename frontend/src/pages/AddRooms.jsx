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
      [name]: files ? files[0] : value
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
        type="file" 
        name="image"
        onChange={handleChange}
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

        <input
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          placeholder="Owner"
          required
        />

        <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default AddRooms
