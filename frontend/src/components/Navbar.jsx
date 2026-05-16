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
    <nav className="mx-4 mt-4">

      <div className="bg-white/20 backdrop-blur-md text-white px-4 md:px-8 py-3 flex items-center justify-between rounded-xl shadow-lg">

        {/* Left */}
        <div className="flex items-center gap-3">

          <div className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
            <img
              src="/transparent-logo.png"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
          </div>

          <h1 className="text-xl font-bold">StayNest</h1>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base flex-wrap">

          <Link className="hover:text-blue-300 transition" to="/">Home</Link>
          <Link className="hover:text-blue-300 transition" to="/rooms">Rooms</Link>

          {/* USER */}
          {role === "user" && (
            <Link className="hover:text-blue-300" to="/UserBooking">
              My Bookings
            </Link>
          )}

          {/* USER */}
          {role === "user" && (
            <Link className="hover:text-blue-300" to="/favorite">
              My Favorite
            </Link>
          )}

          {/* OWNER */}
          {role === "owner" && (
            <>
              <Link className="hover:text-blue-300" to="/AddRooms">Add Room</Link>
              <Link className="hover:text-blue-300" to="/my-rooms">My Rooms</Link>
            </>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <>
              <Link className="hover:text-blue-300" to="/AddRooms">Add Room</Link>
              <Link className="hover:text-blue-300" to="/ManageBookings">Bookings</Link>
              <Link className="hover:text-blue-300" to="/admin">Admin</Link>
            </>
          )}

          {/* Auth */}
          {!loggedIn ? (
            <>
              <Link
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg transition"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg transition"
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>

    </nav>
  );
};

export default Navbar;