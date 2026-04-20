import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getUserRole } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const role = getUserRole();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-4 md:px-8 py-3 flex items-center justify-between shadow-md">

      {/* Left */}
      <div className="flex items-center gap-3">
        <img src="transparent-logo.png" alt="logo" className="w-12 h-12" />
        <h1 className="text-xl font-bold">StayNest</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6 text-sm md:text-base">

        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>

        {/* USER */}
        {role === "user" && (
          <Link to="/UserBooking">My Bookings</Link>
        )}

        {/* OWNER */}
        {role === "owner" && (
          <>
            <Link to="/AddRooms">Add Room</Link>
            <Link to="/my-rooms">My Rooms</Link>
          </>
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <Link to="/AddRooms">Add Room</Link>
            <Link to="/ManageBookings">All Bookings</Link>
            <Link to="/admin">Admin Panel</Link>
          </>
        )}

        {/* Auth Buttons */}
        {!loggedIn ? (
          <>
            <Link className="bg-blue-500 px-3 py-1 rounded" to="/login">
              Login
            </Link>
            <Link className="bg-green-500 px-3 py-1 rounded" to="/register">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;