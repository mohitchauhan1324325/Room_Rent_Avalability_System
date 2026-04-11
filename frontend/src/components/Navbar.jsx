import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-4 md:px-8 py-3 flex items-center justify-between shadow-md">

      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-3">
        <img
          src="transparent-logo.png"
          alt="logo"
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-xl font-bold tracking-wide">StayNest</h1>
      </div>

      {/* Right: Links */}
      <div className="flex items-center gap-6 text-sm md:text-base">

        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>

        <Link to="/rooms" className="hover:text-gray-300">
          Rooms
        </Link>

        {/* Only show if logged in */}
        {loggedIn && (
          <>
            <Link to="/AddRooms" className="hover:text-gray-300">
              Add Room
            </Link>

            <Link to="/ManageBookings" className="hover:text-gray-300">
              Booking
            </Link>
          </>
        )}

        {/* Auth buttons */}
        {!loggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;