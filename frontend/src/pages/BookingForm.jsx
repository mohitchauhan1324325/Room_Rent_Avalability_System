import { useLocation } from "react-router-dom";
import { useState } from "react";
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
      moveInDate: date,
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
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 flex items-center justify-center">
      
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Room Info Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800">
            {room.title}
          </h2>
          <p className="text-gray-600 mt-2">
            <span className="font-medium">Price:</span> ₹{room.price}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Location:</span> {room.location}
          </p>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 space-y-5"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Booking Form
          </h2>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition duration-200 disabled:opacity-60"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default BookingForm;