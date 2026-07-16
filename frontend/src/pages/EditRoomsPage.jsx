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
    images: [],
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
    const { name, value, files, type } = e.target;

    setRoom({
      ...room,
      [name]: type === "file"
        ? Array.from(files)
        : value
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

      room.images.forEach((image) => {
        data.append("images", image);
      })

      await updateRoom(id, data);
      toast.success("Room updated!");
      navigate(`/RoomDetails/${id}`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      className="
        min-h-screen
        bg-gray-50 dark:bg-gray-900
        flex flex-col
        items-center justify-center
        px-4 py-8 pb-20 pt-28 sm:pt-32 lg:pt-36
      "
    >

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="
          mb-4
          bg-white/90 dark:bg-gray-800/90
          backdrop-blur-md
          border border-gray-200/70 dark:border-gray-700/80
          text-gray-800 dark:text-gray-100
          px-4 py-2 rounded-2xl
          shadow-sm
          hover:bg-gray-100 dark:hover:bg-gray-700
          transition duration-200
        "
      >
        ← Back
      </button>

      {/* FORM */}
      <EditForm
        room={room}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

    </div>
  );
};

export default EditRoomsPage;