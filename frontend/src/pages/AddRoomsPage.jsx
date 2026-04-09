import { useState } from "react"
import { createRoom } from "../api/roomApi";
import Loader from "../components/Loader";
import AddRoomsForm from "../components/AddRoomsForm";

const AddRoomsPage = () => {

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
      data.append("owner", formData.owner);
      
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
    <AddRoomsForm
    handleChange={handleChange}
    handleAddRooms={handleAddRooms}
    />
  )
}

export default AddRoomsPage
