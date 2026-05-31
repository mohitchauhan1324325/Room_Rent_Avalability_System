import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getUserRole } from "../utils/auth";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Navbar = () => {

  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const role = getUserRole();
  const { darkMode, setDarkMode } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <nav className="mx-4 mt-4 relative z-[90]">

      <div
        className="
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-md
          text-gray-800 dark:text-white
          px-4 md:px-8 py-3
          rounded-2xl
          shadow-xl
          border border-gray-200 dark:border-gray-700
        "
      >

        {/* TOP BAR */}
        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <div
              className="
                bg-black/10 dark:bg-black/30
                backdrop-blur-sm
                px-2 py-1 rounded
              "
            >

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

          {/* DESKTOP MENU */}
          <div
            className="
              hidden md:flex
              items-center gap-4
              text-sm md:text-base
            "
          >

            <Link
              className="hover:text-blue-500 transition"
              to="/"
            >
              Home
            </Link>

            <Link
              className="hover:text-blue-500 transition"
              to="/rooms"
            >
              Rooms
            </Link>

            {role === "user" && (
              <>
                <Link
                  className="hover:text-blue-500 transition"
                  to="/UserBooking"
                >
                  My Bookings
                </Link>

                <Link
                  className="hover:text-blue-500 transition"
                  to="/favorite"
                >
                  Favorite
                </Link>
              </>
            )}

            {role === "owner" && (
              <>
                <Link
                  className="hover:text-blue-500 transition"
                  to="/AddRooms"
                >
                  Add Room
                </Link>

                <Link
                  className="hover:text-blue-500 transition"
                  to="/my-rooms"
                >
                  My Rooms
                </Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Link
                  className="hover:text-blue-500 transition"
                  to="/AddRooms"
                >
                  Add Room
                </Link>

                <Link
                  className="hover:text-blue-500 transition"
                  to="/ManageBookings"
                >
                  Bookings
                </Link>

                <Link
                  className="hover:text-blue-500 transition"
                  to="/admin"
                >
                  Admin
                </Link>
              </>
            )}

            {!loggedIn ? (
              <>
                <Link
                  className="
                    bg-blue-500 hover:bg-blue-600
                    text-white
                    px-3 py-1 rounded-lg
                  "
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="
                    bg-green-500 hover:bg-green-600
                    text-white
                    px-3 py-1 rounded-lg
                  "
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (

              <button
                onClick={handleLogout}
                className="
                  bg-red-500 hover:bg-red-600
                  text-white
                  px-3 py-1 rounded-lg
                "
              >
                Logout
              </button>
            )}

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="
                px-3 py-1.5 rounded-lg
                bg-gray-200 dark:bg-gray-700
              "
            >
              {darkMode
                ? "Light"
                : "Dark"}
            </button>

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setIsOpen(!isOpen)
            }
            className="
              md:hidden
              p-2 rounded-lg
              bg-gray-200 dark:bg-gray-700
            "
          >
            ☰
          </button>

        </div>

        {/* MOBILE MENU */}
        {isOpen && (

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.3,
            }}

            className="
              md:hidden
              mt-4 pt-4
              border-t
              border-gray-200 dark:border-gray-700
              flex flex-col gap-3
              text-sm
            "
          >

            <Link
              to="/"
              className="hover:text-blue-500"
            >
              Home
            </Link>

            <Link
              to="/rooms"
              className="hover:text-blue-500"
            >
              Rooms
            </Link>

            {role === "user" && (
              <>
                <Link
                  to="/UserBooking"
                  className="hover:text-blue-500"
                >
                  My Bookings
                </Link>

                <Link
                  to="/favorite"
                  className="hover:text-blue-500"
                >
                  Favorite
                </Link>
              </>
            )}

            {role === "owner" && (
              <>
                <Link
                  to="/AddRooms"
                  className="hover:text-blue-500"
                >
                  Add Room
                </Link>

                <Link
                  to="/my-rooms"
                  className="hover:text-blue-500"
                >
                  My Rooms
                </Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Link
                  to="/AddRooms"
                  className="hover:text-blue-500"
                >
                  Add Room
                </Link>

                <Link
                  to="/ManageBookings"
                  className="hover:text-blue-500"
                >
                  Bookings
                </Link>

                <Link
                  to="/admin"
                  className="hover:text-blue-500"
                >
                  admin
                </Link>
              </>
            )}

            {!loggedIn ? (
              <>
                <Link
                  to="/login"
                  className="
                    bg-blue-500
                    text-white
                    px-3 py-2 rounded-lg
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    bg-green-500
                    text-white
                    px-3 py-2 rounded-lg
                  "
                >
                  Register
                </Link>
              </>
            ) : (

              <button
                onClick={handleLogout}
                className="
                  bg-red-500
                  text-white
                  px-3 py-2 rounded-lg
                "
              >
                Logout
              </button>
            )}

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="
                px-3 py-2 rounded-lg
                bg-gray-200 dark:bg-gray-700
              "
            >
              {darkMode
                ? "Light Mode"
                : "Dark Mode"}
            </button>

          </motion.div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;