import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../api/roomApi";
import Loader from "../components/Loader";
import EditForm from "../components/EditForm";

const EditRoomsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    location: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const res = await getRoomById(id);
        setRoom(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setRoom({
      ...room,
      [name]: files && files.length > 0 ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", room.title);
      data.append("price", room.price);
      data.append("location", room.location);
      data.append("description", room.description);
      data.append("image", room.image);

      await updateRoom(id, data);
      alert("Room updated!");
      navigate("/Rooms");
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 flex items-center justify-center">

      <EditForm
        room={room}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

    </div>
  );
};

export default EditRoomsPage;