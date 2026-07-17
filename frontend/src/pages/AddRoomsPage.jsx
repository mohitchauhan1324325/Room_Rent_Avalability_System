import { useState } from "react"
import { createRoom } from "../api/roomApi";
import Loader from "../components/Loader";
import AddRoomsForm from "../components/AddRoomsForm";
import { toast } from "react-toastify";

const AddRoomsPage = () => {

  const [loading, setLoading] = useState(false);
  const initialState = {
    title: "",
    description: "",
    price: "",
    location: "",
    capacity: "",
    images: []
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file"
        ? Array.from(files)
        : value
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
      data.append("capacity", formData.capacity);

      formData.images.forEach((image) => {
        data.append("images", image);
      });

      await createRoom(data);

      toast.success("Room Saved!");
      setFormData(initialState);
    } catch (error) {
      console.log(error);
      toast.error("Error saving room");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <AddRoomsForm
      handleChange={handleChange}
      handleAddRooms={handleAddRooms}
    />
  )
}

export default AddRoomsPage
