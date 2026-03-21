import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";
import { bookRoom } from "../api/bookingApi";

const BookingForm = () => {

  const location = useLocation();
  const room = location.state;

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
      moveInDate: date
    };  

    try {
      const res = await bookRoom(bookingData);
      alert(res.message);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div>

      <h2>Booking Form</h2>

      <h3>{room.title}</h3>
      <p>Price: {room.price}</p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <input type="text"
        placeholder="phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)} 
        />

        <br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

      </form>

    </div>
  );
}

export default BookingForm;