import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="h-full p-4 text-white backdrop-blur-md bg-white/10 border-r border-white/20">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Room Rent
      </h2>

      <ul className="space-y-2 font-medium">

        <li>
          <Link
            to="/"
            className="flex items-center p-3 rounded-lg hover:bg-white/20 transition"
          >
            🏠
            <span className="ms-3">Home</span>
          </Link>
        </li>

        <li>
          <Link
            to="/rooms"
            className="flex items-center p-3 rounded-lg hover:bg-white/20 transition"
          >
            🛏️
            <span className="ms-3">Browse Rooms</span>
          </Link>
        </li>

        <li>
          <Link
            to="/my-bookings"
            className="flex items-center p-3 rounded-lg hover:bg-white/20 transition"
          >
            📅
            <span className="ms-3">My Bookings</span>
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className="flex items-center p-3 rounded-lg hover:bg-white/20 transition"
          >
            👤
            <span className="ms-3">Profile</span>
          </Link>
        </li>

        <hr className="my-4 border-white/20" />

        <li>
          <Link
            to="/AddRooms"
            className="flex items-center p-3 rounded-lg hover:bg-white/20 transition"
          >
            ➕
            <span className="ms-3">Add Room</span>
          </Link>
        </li>

        <li>
          <Link
            to="/ManageBookings"
            className="flex items-center p-3 rounded-lg hover:bg-white/20 transition"
          >
            📋
            <span className="ms-3">Manage Bookings</span>
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default SideBar;