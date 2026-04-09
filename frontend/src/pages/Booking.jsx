import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { bookRoom } from "../api/bookingApi";
import Loader from "../components/Loader";
import BookingForm from "../components/BookingForm";

const Booking = () => {
  const location = useLocation();
  const room = location.state;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const bookingData = {
      roomId: room._id,
      tenantName: name,
      phone,
      location: room.location,
      moveInDate: date,
    };

    try {
      setLoading(true);
      const res = await bookRoom(bookingData);
      alert(res.message);
      navigate("/rooms");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);

    }
  };

  if(loading) return <Loader /> ;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 flex items-center justify-center">
      
      <BookingForm
      room={room}
      name={name}
      setName={setName}
      date={date}
      setDate={setDate}
      phone={phone}
      setPhone={setPhone}
      loading={loading}
      handleSubmit={handleSubmit}
      />
      
    </div>
  );
};

export default Booking;