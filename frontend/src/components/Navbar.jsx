import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getUserRole } from "../utils/auth";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const role = getUserRole();

  const { darkMode, setDarkMode } = useContext(AppContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="mx-4 mt-4">

      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-800 dark:text-white px-4 md:px-8 py-3 flex items-center justify-between rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">

        {/* Left */}
        <div className="flex items-center gap-3">

          <div className="bg-black/10 dark:bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
            <img
              src="/transparent-logo.png"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
          </div>

          <h1 className="text-xl font-bold">
            StayNest
          </h1>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base flex-wrap">

          <Link
            className="hover:text-blue-500 dark:hover:text-blue-300 transition"
            to="/"
          >
            Home
          </Link>

          <Link
            className="hover:text-blue-500 dark:hover:text-blue-300 transition"
            to="/rooms"
          >
            Rooms
          </Link>

          {/* USER */}
          {role === "user" && (
            <Link
              className="hover:text-blue-500 dark:hover:text-blue-300 transition"
              to="/UserBooking"
            >
              My Bookings
            </Link>
          )}

          {/* USER */}
          {role === "user" && (
            <Link
              className="hover:text-blue-500 dark:hover:text-blue-300 transition"
              to="/favorite"
            >
              My Favorite
            </Link>
          )}

          {/* OWNER */}
          {role === "owner" && (
            <>
              <Link
                className="hover:text-blue-500 dark:hover:text-blue-300 transition"
                to="/AddRooms"
              >
                Add Room
              </Link>

              <Link
                className="hover:text-blue-500 dark:hover:text-blue-300 transition"
                to="/my-rooms"
              >
                My Rooms
              </Link>
            </>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <>
              <Link
                className="hover:text-blue-500 dark:hover:text-blue-300 transition"
                to="/AddRooms"
              >
                Add Room
              </Link>

              <Link
                className="hover:text-blue-500 dark:hover:text-blue-300 transition"
                to="/ManageBookings"
              >
                Bookings
              </Link>

              <Link
                className="hover:text-blue-500 dark:hover:text-blue-300 transition"
                to="/admin"
              >
                Admin
              </Link>
            </>
          )}

          {/* Auth */}
          {!loggedIn ? (
            <>
              <Link
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
            >
              Logout
            </button>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? "Light" : "Dark"}
          </button>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;