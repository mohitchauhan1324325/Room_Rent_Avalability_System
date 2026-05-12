import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../api/roomApi";
import Loader from "../components/Loader";
import EditForm from "../components/EditForm";
import { toast } from "react-toastify";

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
      toast.success("Room updated!");
      navigate("/Rooms");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg text-black hover:bg-white/50 transition"
      >
        ← Back
      </button>

      <EditForm
        room={room}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

    </div>
  );
};

export default EditRoomsPage;