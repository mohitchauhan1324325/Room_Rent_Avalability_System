import { Link } from "react-router-dom";

const SideBar = () => {
  return (

    <div
      className="
        absolute right-0 top-0 h-full
        w-[260px]
        text-gray-800 dark:text-white
        backdrop-blur-md
        bg-white/80 dark:bg-gray-900/80
        border-l border-gray-200 dark:border-gray-700
        shadow-2xl
        p-5
      "
    >

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Room Rent
      </h2>

      {/* MENU */}
      <ul className="space-y-2 font-medium">

        <li>
          <Link
            to="/"
            className="
              flex items-center p-3 rounded-xl
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition duration-200
            "
          >
            <span className="text-lg">🏠</span>

            <span className="ms-3">
              Home
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/rooms"
            className="
              flex items-center p-3 rounded-xl
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition duration-200
            "
          >
            <span className="text-lg">🛏️</span>

            <span className="ms-3">
              Browse Rooms
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/my-bookings"
            className="
              flex items-center p-3 rounded-xl
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition duration-200
            "
          >
            <span className="text-lg">📅</span>

            <span className="ms-3">
              My Bookings
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className="
              flex items-center p-3 rounded-xl
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition duration-200
            "
          >
            <span className="text-lg">👤</span>

            <span className="ms-3">
              Profile
            </span>
          </Link>
        </li>

        {/* DIVIDER */}
        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        <li>
          <Link
            to="/AddRooms"
            className="
              flex items-center p-3 rounded-xl
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition duration-200
            "
          >
            <span className="text-lg">➕</span>

            <span className="ms-3">
              Add Room
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/ManageBookings"
            className="
              flex items-center p-3 rounded-xl
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition duration-200
            "
          >
            <span className="text-lg">📋</span>

            <span className="ms-3">
              Manage Bookings
            </span>
          </Link>
        </li>

      </ul>

    </div>
  );
};

export default SideBar;